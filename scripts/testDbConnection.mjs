/**
 * DB Connection Test Script
 * -------------------------
 * Tests Supabase connectivity, anonymous auth, and both tables.
 * 
 * Usage:  node scripts/testDbConnection.mjs
 * 
 * Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env.local manually (no dotenv dependency needed) ──
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

let envVars = {};
try {
    const envFile = readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...rest] = trimmed.split('=');
        envVars[key.trim().replace(/\r/g, '')] = rest.join('=').trim().replace(/\r/g, '');
    });
} catch {
    console.error('❌ Could not read .env.local — make sure it exists in the project root.');
    console.error(`   Expected path: ${envPath}`);
    process.exit(1);
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
}

// ── Helpers ──
const pass = (msg) => console.log(`  ✅ ${msg}`);
const fail = (msg, err) => { console.error(`  ❌ ${msg}`); if (err) console.error(`     ${err.message || err}`); };
let passed = 0;
let failed = 0;

// ── Create Supabase Client ──
const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
    console.log('\n🔬 Supabase DB Connection Test');
    console.log('─'.repeat(45));

    // ── Test 1: Basic Connectivity ──
    console.log('\n1️⃣  Basic Connectivity');
    try {
        const { data, error } = await supabase.from('papers_metadata').select('id').limit(1);
        if (error) throw error;
        pass(`Connected to Supabase at ${supabaseUrl}`);
        passed++;
    } catch (err) {
        fail('Cannot reach Supabase', err);
        failed++;
    }

    // ── Test 2: Anonymous Auth ──
    console.log('\n2️⃣  Anonymous Authentication');
    try {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        pass(`Signed in anonymously — user id: ${data.user?.id}`);
        passed++;
    } catch (err) {
        fail('Anonymous sign-in failed', err);
        failed++;
    }

    // ── Test 3: Read papers_metadata ──
    console.log('\n3️⃣  Read: papers_metadata');
    try {
        const { data, error, count } = await supabase
            .from('papers_metadata')
            .select('*', { count: 'exact' })
            .limit(5);
        if (error) throw error;
        pass(`Query succeeded — ${count ?? data?.length ?? 0} total row(s), fetched ${data?.length ?? 0}`);
        if (data && data.length > 0) {
            console.log(`     Sample: "${data[0].title}" by ${data[0].first_author}`);
        }
        passed++;
    } catch (err) {
        fail('Cannot read papers_metadata', err);
        failed++;
    }

    // ── Test 4: Read user_paper_interactions (with join) ──
    console.log('\n4️⃣  Read: user_paper_interactions (+ join)');
    try {
        const { data, error } = await supabase
            .from('user_paper_interactions')
            .select(`*, papers_metadata ( id, title, first_author, domain, citation_count )`)
            .limit(5);
        if (error) throw error;
        pass(`Join query succeeded — fetched ${data?.length ?? 0} interaction(s)`);
        if (data && data.length > 0) {
            const row = data[0];
            console.log(`     Sample: stage="${row.reading_stage}", paper="${row.papers_metadata?.title}"`);
        }
        passed++;
    } catch (err) {
        fail('Cannot read user_paper_interactions', err);
        failed++;
    }

    // ── Test 5: Write test (insert + rollback) ──
    console.log('\n5️⃣  Write: Insert + Delete (papers_metadata)');
    try {
        const testTitle = `__TEST_${Date.now()}`;
        const { data: inserted, error: insertErr } = await supabase
            .from('papers_metadata')
            .insert({ title: testTitle, first_author: 'Test Bot', domain: 'Computer Science', citation_count: 0 })
            .select()
            .single();
        if (insertErr) throw insertErr;
        pass(`Inserted test row: id=${inserted.id}`);

        // Clean up
        const { error: deleteErr } = await supabase
            .from('papers_metadata')
            .delete()
            .eq('id', inserted.id);
        if (deleteErr) throw deleteErr;
        pass('Cleaned up test row');
        passed++;
    } catch (err) {
        fail('Write test failed (check RLS policies for papers_metadata)', err);
        failed++;
    }

    // ── Summary ──
    console.log('\n' + '─'.repeat(45));
    console.log(`📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
    if (failed === 0) {
        console.log('🎉 All tests passed! Your DB connection is working.\n');
    } else {
        console.log('⚠️  Some tests failed. Check the errors above.\n');
    }

    process.exit(failed > 0 ? 1 : 0);
}

runTests();
