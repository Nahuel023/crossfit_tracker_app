-- CrossFit Tracker — Training Blocks Seed (Phase 1: May–September 2026)
-- Idempotent: uses INSERT ... ON CONFLICT DO NOTHING with stable UUIDs derived from content
-- Run in Supabase SQL Editor after schema.sql

-- ============================================================
-- HELPER: We use md5-based deterministic UUIDs for idempotency
-- ============================================================

-- ============================================================
-- MAY 2026 — Week 1 (Mon May 4)
-- ============================================================

insert into public.training_blocks (id, week_start, day_of_week, phase, month, category, title, description, skills, is_travel_block) values

-- WEEK 1
('11000001-0000-0000-0000-000000000001', '2026-05-04', 0, 'build', 'may_2026', 'gymnastics',
 'WOD + Double Unders Wrist Timing',
 'CrossFit WOD class. Post-WOD accessory (10 min): 3 sets of 1 double under → pause → 1 double under. Focus on wrist timing and high jump. Then HSPU: Pike push-up feet on box (60cm). 4x8. Full range, head touches floor.',
 ARRAY['double_unders','hspu_strict'], false),

('11000001-0000-0000-0000-000000000002', '2026-05-04', 1, 'build', 'may_2026', 'cardio',
 'Padel — Active Recovery',
 'Padel session. Treat as active recovery. Enjoy the game, keep intensity moderate.',
 ARRAY[]::text[], false),

('11000001-0000-0000-0000-000000000003', '2026-05-04', 2, 'build', 'may_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol Squat Activation',
 'Pre-session pistol squat: Pistol to high box (60cm). 3x5 each leg. Focus on balance and heel contact. Then Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('11000001-0000-0000-0000-000000000004', '2026-05-04', 3, 'build', 'may_2026', 'cardio',
 'Zone 2 + Handstand Wall Practice',
 'Zone 2 cardio: 30 min at conversational pace (row, bike, or easy run). Then 10 min handstand practice: wall handstand + shoulder taps. Attempt 1-2 free steps.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('11000001-0000-0000-0000-000000000005', '2026-05-04', 4, 'build', 'may_2026', 'gymnastics',
 'WOD + Muscle-Up Foundations + Rope Climb',
 'CrossFit WOD class. Post-WOD: Strict pull-ups 5x3, 2 min rest (never to failure). Muscle-up: High kipping pull-ups (chest to bar) 4x8. Box transition with false grip. Rope climb: 3 climbs with leg cross technique — focus on the "chair" lock.',
 ARRAY['pullup_strict','muscle_up_rings','rope_climb'], false),

('11000001-0000-0000-0000-000000000006', '2026-05-04', 5, 'build', 'may_2026', 'cardio',
 'Zone 2 or Free Skill Practice',
 'Zone 2: 30 min at conversational pace. OR free skill practice — double unders, handstand, pistol squat. Choose based on energy.',
 ARRAY['zone2_cardio','double_unders'], false),

-- WEEK 2
('11000002-0000-0000-0000-000000000001', '2026-05-11', 0, 'build', 'may_2026', 'gymnastics',
 'WOD + Double Unders 3x3 + HSPU Box',
 'CrossFit WOD class. Pre-WOD double unders (10 min): 3 sets of 3 consecutive doubles, rest between sets. Post-WOD HSPU: Pike push-up feet on box (60cm). 4x8. Full range.',
 ARRAY['double_unders','hspu_strict'], false),

('11000002-0000-0000-0000-000000000002', '2026-05-11', 1, 'build', 'may_2026', 'cardio',
 'Padel — Active Recovery',
 'Padel session. Active recovery.',
 ARRAY[]::text[], false),

('11000002-0000-0000-0000-000000000003', '2026-05-11', 2, 'build', 'may_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol Squat Mid Box',
 'Pre-session: Pistol to mid box (40cm). 3x5. Start with weaker leg. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('11000002-0000-0000-0000-000000000004', '2026-05-11', 3, 'build', 'may_2026', 'cardio',
 'Zone 2 + Handstand Free Steps',
 'Zone 2: 30-35 min. Then handstand practice: wall handstand shoulder taps, attempt 1-2 free steps.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('11000002-0000-0000-0000-000000000005', '2026-05-11', 4, 'build', 'may_2026', 'gymnastics',
 'WOD + Pull-Ups 5x4 + Muscle-Up Kipping',
 'CrossFit WOD. Post-WOD: Strict pull-ups 5x4, 2 min rest. Muscle-up: High kipping pull-ups 4x8. Rope climb: 3 technical climbs.',
 ARRAY['pullup_strict','muscle_up_rings','rope_climb'], false),

('11000002-0000-0000-0000-000000000006', '2026-05-11', 5, 'build', 'may_2026', 'cardio',
 'Zone 2 or Free Skill Practice',
 'Zone 2 35 min OR double unders / pistol squat practice.',
 ARRAY['zone2_cardio'], false),

-- WEEK 3
('11000003-0000-0000-0000-000000000001', '2026-05-18', 0, 'build', 'may_2026', 'gymnastics',
 'WOD + Double Unders 5x5-8 + HSPU 2 Abmats',
 'CrossFit WOD. Pre-WOD double unders (10 min): 5 sets of 5-8 doubles, reset without frustration if broken. Post-WOD HSPU: 2 abmats against wall. 4x3-4.',
 ARRAY['double_unders','hspu_strict'], false),

('11000003-0000-0000-0000-000000000002', '2026-05-18', 1, 'build', 'may_2026', 'cardio',
 'Padel — Active Recovery',
 'Padel session.',
 ARRAY[]::text[], false),

('11000003-0000-0000-0000-000000000003', '2026-05-18', 2, 'build', 'may_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol Squat Low Box',
 'Pre-session: Pistol to low box (20cm). 3x5. Attempt 1-2 free pistols if comfortable. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('11000003-0000-0000-0000-000000000004', '2026-05-18', 3, 'build', 'may_2026', 'cardio',
 'Zone 2 + Handstand 10 Attempts',
 'Zone 2: 30-35 min. Handstand practice: 10 attempts per session, target 3-5 consecutive steps.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('11000003-0000-0000-0000-000000000005', '2026-05-18', 4, 'build', 'may_2026', 'gymnastics',
 'WOD + Pull-Ups 6x4 + Jumping MU',
 'CrossFit WOD. Post-WOD: Strict pull-ups 6x4, 90 sec rest. Muscle-up: Jumping muscle-up on low rings. 4x3. Rope climb: 3 technical climbs.',
 ARRAY['pullup_strict','muscle_up_rings','rope_climb'], false),

('11000003-0000-0000-0000-000000000006', '2026-05-18', 5, 'build', 'may_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2 35 min OR free skill session.',
 ARRAY['zone2_cardio'], false),

-- WEEK 4
('11000004-0000-0000-0000-000000000001', '2026-05-25', 0, 'build', 'may_2026', 'gymnastics',
 'WOD + Double Under Max Test + HSPU 1 Abmat',
 'CrossFit WOD. Pre-WOD double under max test — target 20+ consecutive. HSPU: 1 abmat. 4x3. Attempt 1-2 without abmat.',
 ARRAY['double_unders','hspu_strict'], false),

('11000004-0000-0000-0000-000000000002', '2026-05-25', 1, 'build', 'may_2026', 'cardio',
 'Padel — Active Recovery',
 'Padel session.',
 ARRAY[]::text[], false),

('11000004-0000-0000-0000-000000000003', '2026-05-25', 2, 'build', 'may_2026', 'olympic_lifting',
 'Olympic Lifting + Free Pistol with Counterweight',
 'Pre-session: Free pistol with 5kg counterweight. 3x3 each leg. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('11000004-0000-0000-0000-000000000004', '2026-05-25', 3, 'build', 'may_2026', 'cardio',
 'Zone 2 + Handstand Walk Attempts',
 'Zone 2: 30-35 min. Handstand: 10 attempts, target 3-5 consecutive steps.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('11000004-0000-0000-0000-000000000005', '2026-05-25', 4, 'build', 'may_2026', 'gymnastics',
 'WOD + Pull-Ups 6x5 + Banded Muscle-Up',
 'CrossFit WOD. Post-WOD: Strict pull-ups 6x5, 90 sec rest. Test target: 8-9 consecutive strict. Muscle-up: Banded (light band) 3x2-3. Rope climb: 3 climbs.',
 ARRAY['pullup_strict','muscle_up_rings','rope_climb'], false),

('11000004-0000-0000-0000-000000000006', '2026-05-25', 5, 'build', 'may_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2 35 min OR free skill session.',
 ARRAY['zone2_cardio'], false),

-- ============================================================
-- JUNE 2026 — Week 1 (Mon June 1)
-- ============================================================

('12000001-0000-0000-0000-000000000001', '2026-06-01', 0, 'build', 'jun_2026', 'gymnastics',
 'WOD + Double Unders Max Set Practice + HSPU to Floor',
 'CrossFit WOD. Pre-WOD double unders (10 min): max set → 30 sec rest → repeat 5 times. Target 40-50 chained. Post-WOD HSPU strict to floor: 4x3-4.',
 ARRAY['double_unders','hspu_strict'], false),

('12000001-0000-0000-0000-000000000002', '2026-06-01', 1, 'build', 'jun_2026', 'cardio',
 'Padel — Active Recovery',
 'Padel session.',
 ARRAY[]::text[], false),

('12000001-0000-0000-0000-000000000003', '2026-06-01', 2, 'build', 'jun_2026', 'olympic_lifting',
 'Olympic Lifting + Free Pistol with Counterweight',
 'Pre-session: Free pistol with 5kg counterweight. 3x5 each leg. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('12000001-0000-0000-0000-000000000004', '2026-06-01', 3, 'build', 'jun_2026', 'cardio',
 'Zone 2 35-40 min + Handstand 15 min',
 'Zone 2: 35-40 min. Handstand walk 15 min dedicated: focus on looking at floor ahead of hands.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('12000001-0000-0000-0000-000000000005', '2026-06-01', 4, 'build', 'jun_2026', 'gymnastics',
 'WOD + Pull-Ups 6x6 + Banded/Minimal Jump MU',
 'CrossFit WOD. Post-WOD: Strict pull-ups 6x6, 90 sec rest. Butterfly pull-ups: 5 with pause between each. Muscle-up: light band or minimal jump 4x2-3. Rope climb: 3 technical.',
 ARRAY['pullup_strict','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('12000001-0000-0000-0000-000000000006', '2026-06-01', 5, 'build', 'jun_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2: 35-40 min OR free skill session.',
 ARRAY['zone2_cardio'], false),

('12000002-0000-0000-0000-000000000001', '2026-06-08', 0, 'build', 'jun_2026', 'gymnastics',
 'WOD + Double Unders Volume + Kipping HSPU Intro',
 'CrossFit WOD. Pre-WOD double unders: max set → 30s rest × 5. Introduce kipping HSPU: 3x5 after strict work. Strict to floor: 4x3-4.',
 ARRAY['double_unders','hspu_strict','hspu_kipping'], false),

('12000002-0000-0000-0000-000000000002', '2026-06-08', 1, 'build', 'jun_2026', 'cardio',
 'Padel',
 'Padel session.',
 ARRAY[]::text[], false),

('12000002-0000-0000-0000-000000000003', '2026-06-08', 2, 'build', 'jun_2026', 'olympic_lifting',
 'Olympic Lifting + Free Pistol No Weight',
 'Pre-session: Free pistol no weight 3x3 each leg. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('12000002-0000-0000-0000-000000000004', '2026-06-08', 3, 'build', 'jun_2026', 'cardio',
 'Zone 2 + Handstand Walk 15 min',
 'Zone 2: 35-40 min. Handstand 15 min. Chain 5-8 butterfly pull-ups for rhythm practice.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('12000002-0000-0000-0000-000000000005', '2026-06-08', 4, 'build', 'jun_2026', 'gymnastics',
 'WOD + Pull-Ups 5x7 + MU Clean Attempts',
 'CrossFit WOD. Post-WOD: Strict pull-ups 5x7, 2 min rest. Introduce weighted pull-ups: 4x3 with 5kg. Butterfly: chain 5-8. Muscle-up clean attempts: 5 tries, full rest. Rope: 3 climbs + attempt 1-2 strict.',
 ARRAY['pullup_strict','pullup_weighted','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('12000002-0000-0000-0000-000000000006', '2026-06-08', 5, 'build', 'jun_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

('12000003-0000-0000-0000-000000000001', '2026-06-15', 0, 'build', 'jun_2026', 'gymnastics',
 'WOD + Double Unders in WODs + HSPU 3 Strict + Max Kipping',
 'CrossFit WOD with double unders integrated. HSPU: combine 3 strict + max kipping same set.',
 ARRAY['double_unders','hspu_strict','hspu_kipping'], false),

('12000003-0000-0000-0000-000000000002', '2026-06-15', 1, 'build', 'jun_2026', 'cardio',
 'Padel',
 'Padel session.',
 ARRAY[]::text[], false),

('12000003-0000-0000-0000-000000000003', '2026-06-15', 2, 'build', 'jun_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol in WODs',
 'Free pistol squat in WODs, no scale. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('12000003-0000-0000-0000-000000000004', '2026-06-15', 3, 'build', 'jun_2026', 'cardio',
 'Zone 2 + Handstand Walk 15 min',
 'Zone 2: 35-40 min. Handstand: 15 min, target 10 continuous meters.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('12000003-0000-0000-0000-000000000005', '2026-06-15', 4, 'build', 'jun_2026', 'gymnastics',
 'WOD + Pull-Ups 5x7 + Weighted + MU 3x1-2',
 'CrossFit WOD. Pull-ups: 5x7 strict + introduce load 4x3 @5kg. Butterfly: chain 5-8. Muscle-up: 3x1-2 clean if achieved. Rope: 3 technical + strict attempt.',
 ARRAY['pullup_strict','pullup_weighted','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('12000003-0000-0000-0000-000000000006', '2026-06-15', 5, 'build', 'jun_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

('12000004-0000-0000-0000-000000000001', '2026-06-22', 0, 'build', 'jun_2026', 'gymnastics',
 'WOD + Double Unders Integration Week 4',
 'CrossFit WOD with double unders Rx. HSPU: combine strict + kipping.',
 ARRAY['double_unders','hspu_strict','hspu_kipping'], false),

('12000004-0000-0000-0000-000000000002', '2026-06-22', 1, 'build', 'jun_2026', 'cardio',
 'Padel',
 'Padel session.',
 ARRAY[]::text[], false),

('12000004-0000-0000-0000-000000000003', '2026-06-22', 2, 'build', 'jun_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol Rx',
 'Pistol squat Rx in WOD. Olympic lifting class.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('12000004-0000-0000-0000-000000000004', '2026-06-22', 3, 'build', 'jun_2026', 'cardio',
 'Zone 2 + Handstand Walk 10m Target',
 'Zone 2: 35-40 min. Handstand: 15 min session. Target 10 continuous meters.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('12000004-0000-0000-0000-000000000005', '2026-06-22', 4, 'build', 'jun_2026', 'gymnastics',
 'WOD + Pull-Up Weighted Test + MU + Butterfly 10',
 'CrossFit WOD. Pull-up: weighted progression with 5kg. Butterfly: chain 5-8. End of month: target 12 consecutive strict pull-ups test. Muscle-up 3x1-2 clean.',
 ARRAY['pullup_strict','pullup_weighted','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('12000004-0000-0000-0000-000000000006', '2026-06-22', 5, 'build', 'jun_2026', 'cardio',
 'Zone 2 or Skill Practice',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

-- ============================================================
-- JULY 2026 — Integrate Phase (4 weeks sampler)
-- ============================================================

('13000001-0000-0000-0000-000000000001', '2026-07-06', 0, 'build', 'jul_2026', 'gymnastics',
 'WOD Rx + Double Unders 60+ + HSPU Kipping 10',
 'CrossFit WOD attempt Rx double unders (sets of 20-30 with micro-pauses). Post-WOD HSPU kipping: aggressive kip, hips drive first. Target 10 chained.',
 ARRAY['double_unders','hspu_kipping'], false),

('13000001-0000-0000-0000-000000000002', '2026-07-06', 1, 'build', 'jul_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('13000001-0000-0000-0000-000000000003', '2026-07-06', 2, 'build', 'jul_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol 5 Reps Each Leg',
 'Pistol squat free: 3x5 each leg pre-session. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('13000001-0000-0000-0000-000000000004', '2026-07-06', 3, 'build', 'jul_2026', 'cardio',
 'Zone 2 + Handstand Walk 90° Turn Practice',
 'Zone 2: 35-40 min. Handstand: 15 min, start practicing 90° turns.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('13000001-0000-0000-0000-000000000005', '2026-07-06', 4, 'build', 'jul_2026', 'gymnastics',
 'WOD + Weighted Pull-Up Day A + Butterfly 20 + MU 5 Sets',
 'WOD. Day A pull-ups (strength): 4x4 @10kg / 4x4 @12.5kg / 4x3 @15kg. Butterfly: target 20 chained. Muscle-up: 5 sets of 1-2 with 3 min full rest. Rope climb Rx.',
 ARRAY['pullup_weighted','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('13000001-0000-0000-0000-000000000006', '2026-07-06', 5, 'build', 'jul_2026', 'cardio',
 'Zone 2 Maintain + Skill Practice',
 'Zone 2: 35-40 min. Practice double unders or butterfly pull-ups.',
 ARRAY['zone2_cardio'], false),

('13000002-0000-0000-0000-000000000001', '2026-07-13', 0, 'build', 'jul_2026', 'gymnastics',
 'WOD Rx + DU Volume + HSPU Kipping',
 'CrossFit WOD Rx double unders. HSPU kipping volume.',
 ARRAY['double_unders','hspu_kipping'], false),

('13000002-0000-0000-0000-000000000002', '2026-07-13', 1, 'build', 'jul_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('13000002-0000-0000-0000-000000000003', '2026-07-13', 2, 'build', 'jul_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol in WOD',
 'Pistol in WOD Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('13000002-0000-0000-0000-000000000004', '2026-07-13', 3, 'build', 'jul_2026', 'cardio',
 'Zone 2 + Handstand Walk 15m Target',
 'Zone 2: 35-40 min. Handstand: target 15 continuous meters.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('13000002-0000-0000-0000-000000000005', '2026-07-13', 4, 'build', 'jul_2026', 'gymnastics',
 'WOD + Pull-Up Day B + MU 5 Chained + Rope',
 'WOD. Day B pull-ups (volume): 4x max strict, 3 min rest, log total reps. Butterfly Rx in WOD. Muscle-up 5 chained rings attempt. Rope climb Rx.',
 ARRAY['pullup_strict','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('13000002-0000-0000-0000-000000000006', '2026-07-13', 5, 'build', 'jul_2026', 'cardio',
 'Zone 2',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

('13000003-0000-0000-0000-000000000001', '2026-07-20', 0, 'build', 'jul_2026', 'gymnastics',
 'WOD Rx + DU + HSPU Kipping',
 'CrossFit WOD Rx. HSPU kipping 10 chained target.',
 ARRAY['double_unders','hspu_kipping'], false),

('13000003-0000-0000-0000-000000000002', '2026-07-20', 1, 'build', 'jul_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('13000003-0000-0000-0000-000000000003', '2026-07-20', 2, 'build', 'jul_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol',
 'Pistol Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('13000003-0000-0000-0000-000000000004', '2026-07-20', 3, 'build', 'jul_2026', 'cardio',
 'Zone 2 + Handstand 90° Turns',
 'Zone 2: 35-40 min. Handstand: 15 min, 90° turns practice.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('13000003-0000-0000-0000-000000000005', '2026-07-20', 4, 'build', 'jul_2026', 'gymnastics',
 'WOD + Weighted Pull-Up Day A + MU Chained + Rope',
 'WOD. Day A: 4x3 @15kg / 4x3 @17.5kg. Muscle-up chained attempt. Rope climb Rx. Target 15 consecutive strict pull-ups.',
 ARRAY['pullup_weighted','pullup_strict','muscle_up_rings','rope_climb'], false),

('13000003-0000-0000-0000-000000000006', '2026-07-20', 5, 'build', 'jul_2026', 'cardio',
 'Zone 2',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

('13000004-0000-0000-0000-000000000001', '2026-07-27', 0, 'build', 'jul_2026', 'gymnastics',
 'WOD Rx + DU + HSPU Kipping Month Test',
 'CrossFit WOD Rx. End of month HSPU kipping max set test.',
 ARRAY['double_unders','hspu_kipping'], false),

('13000004-0000-0000-0000-000000000002', '2026-07-27', 1, 'build', 'jul_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('13000004-0000-0000-0000-000000000003', '2026-07-27', 2, 'build', 'jul_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol 10 Reps Test',
 'Pistol squat: attempt 10 each leg. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('13000004-0000-0000-0000-000000000004', '2026-07-27', 3, 'build', 'jul_2026', 'cardio',
 'Zone 2 + Handstand 15m Test',
 'Zone 2: 35-40 min. Handstand 15m continuous test.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('13000004-0000-0000-0000-000000000005', '2026-07-27', 4, 'build', 'jul_2026', 'gymnastics',
 'WOD + Pull-Up 15 Consec Test + MU 5 Rings + Rope',
 'WOD. Pull-up 15 consecutive test. Butterfly 20 chained test. Muscle-up 5 chained rings attempt. Rope climb Rx.',
 ARRAY['pullup_strict','pullup_butterfly','muscle_up_rings','rope_climb'], false),

('13000004-0000-0000-0000-000000000006', '2026-07-27', 5, 'build', 'jul_2026', 'cardio',
 'Zone 2',
 'Zone 2: 35-40 min.',
 ARRAY['zone2_cardio'], false),

-- ============================================================
-- AUGUST 2026 — Consolidate (4 weeks sampler)
-- ============================================================

('14000001-0000-0000-0000-000000000001', '2026-08-03', 0, 'build', 'aug_2026', 'gymnastics',
 'WOD Rx Norm + DU Always Rx + HSPU Rx if ≤10',
 'CrossFit WOD. Rx becomes the norm. DU always Rx. HSPU Rx if 10 or fewer in a set.',
 ARRAY['double_unders','hspu_kipping','hspu_strict'], false),

('14000001-0000-0000-0000-000000000002', '2026-08-03', 1, 'build', 'aug_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('14000001-0000-0000-0000-000000000003', '2026-08-03', 2, 'build', 'aug_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol Always Rx',
 'Pistol always Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('14000001-0000-0000-0000-000000000004', '2026-08-03', 3, 'build', 'aug_2026', 'cardio',
 'Zone 2 + Handstand Walk Rx Distance',
 'Zone 2: 35-40 min. Handstand walk Rx distance attempt.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('14000001-0000-0000-0000-000000000005', '2026-08-03', 4, 'build', 'aug_2026', 'gymnastics',
 'WOD + Pull-Up @20kg Day A + MU Rx + Bar MU Intro',
 'WOD. Day A: 5x3 @20kg / 5x3 @22.5kg. Bar muscle-up intro (if ring MU consolidated): 2-3 sets of 1-2 at end. Rope climb Rx. Butterfly Rx.',
 ARRAY['pullup_weighted','muscle_up_rings','muscle_up_bar','rope_climb','pullup_butterfly'], false),

('14000001-0000-0000-0000-000000000006', '2026-08-03', 5, 'build', 'aug_2026', 'gymnastics',
 'Competition Simulation Saturday',
 'Full WOD as if judged. Count reps correctly. Log time and result. Simulate competition conditions.',
 ARRAY['double_unders','muscle_up_rings','hspu_kipping','pullup_butterfly'], false),

('14000002-0000-0000-0000-000000000001', '2026-08-10', 0, 'build', 'aug_2026', 'gymnastics',
 'WOD Rx + DU + HSPU',
 'CrossFit WOD Rx. DU Rx, HSPU Rx.',
 ARRAY['double_unders','hspu_kipping'], false),

('14000002-0000-0000-0000-000000000002', '2026-08-10', 1, 'build', 'aug_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('14000002-0000-0000-0000-000000000003', '2026-08-10', 2, 'build', 'aug_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol',
 'Pistol Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('14000002-0000-0000-0000-000000000004', '2026-08-10', 3, 'build', 'aug_2026', 'cardio',
 'Zone 2 + Handstand Walk',
 'Zone 2: 35-40 min. Handstand walk practice.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('14000002-0000-0000-0000-000000000005', '2026-08-10', 4, 'build', 'aug_2026', 'gymnastics',
 'WOD + Pull-Up Day B Max + MU + Bar MU + Rope',
 'WOD. Day B: 3x max strict @bodyweight, 3 min rest — target 18 consecutive. Bar MU: 2-3 sets 1-2. Rope climb Rx.',
 ARRAY['pullup_strict','muscle_up_rings','muscle_up_bar','rope_climb'], false),

('14000002-0000-0000-0000-000000000006', '2026-08-10', 5, 'build', 'aug_2026', 'gymnastics',
 'Competition Simulation Saturday',
 'Full WOD as if judged. Log time and result.',
 ARRAY['double_unders','muscle_up_rings','hspu_kipping','pullup_butterfly'], false),

('14000003-0000-0000-0000-000000000001', '2026-08-17', 0, 'build', 'aug_2026', 'gymnastics',
 'WOD Rx + DU + HSPU',
 'CrossFit WOD Rx.',
 ARRAY['double_unders','hspu_kipping'], false),

('14000003-0000-0000-0000-000000000002', '2026-08-17', 1, 'build', 'aug_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('14000003-0000-0000-0000-000000000003', '2026-08-17', 2, 'build', 'aug_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol',
 'Pistol Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('14000003-0000-0000-0000-000000000004', '2026-08-17', 3, 'build', 'aug_2026', 'cardio',
 'Zone 2 + Handstand Walk',
 'Zone 2: 35-40 min. Handstand walk practice.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('14000003-0000-0000-0000-000000000005', '2026-08-17', 4, 'build', 'aug_2026', 'gymnastics',
 'WOD + Pull-Up @22.5kg + MU + Bar MU + Rope',
 'WOD. Day A: 5x3 @22.5kg / 4x2 @25kg. Bar MU progression. Rope climb Rx.',
 ARRAY['pullup_weighted','muscle_up_rings','muscle_up_bar','rope_climb'], false),

('14000003-0000-0000-0000-000000000006', '2026-08-17', 5, 'build', 'aug_2026', 'gymnastics',
 'Competition Simulation Saturday',
 'Full WOD as if judged. Log time and result.',
 ARRAY['double_unders','muscle_up_rings','hspu_kipping','pullup_butterfly'], false),

('14000004-0000-0000-0000-000000000001', '2026-08-24', 0, 'build', 'aug_2026', 'gymnastics',
 'WOD Rx + DU + HSPU',
 'CrossFit WOD Rx.',
 ARRAY['double_unders','hspu_kipping'], false),

('14000004-0000-0000-0000-000000000002', '2026-08-24', 1, 'build', 'aug_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('14000004-0000-0000-0000-000000000003', '2026-08-24', 2, 'build', 'aug_2026', 'olympic_lifting',
 'Olympic Lifting + Pistol',
 'Pistol Rx. Olympic lifting.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('14000004-0000-0000-0000-000000000004', '2026-08-24', 3, 'build', 'aug_2026', 'cardio',
 'Zone 2 + Handstand Walk',
 'Zone 2: 35-40 min. Handstand walk.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('14000004-0000-0000-0000-000000000005', '2026-08-24', 4, 'build', 'aug_2026', 'gymnastics',
 'WOD + Pull-Up 1RM Weighted Test + MU + Rope',
 'WOD. 1RM weighted pull-up test — target 30kg. Max strict consecutive test — target 18. Bar MU: 3x1-2. Rope climb Rx.',
 ARRAY['pullup_weighted','pullup_strict','muscle_up_rings','muscle_up_bar','rope_climb'], false),

('14000004-0000-0000-0000-000000000006', '2026-08-24', 5, 'build', 'aug_2026', 'gymnastics',
 'Competition Simulation Saturday',
 'Full WOD as if judged. Log time and result.',
 ARRAY['double_unders','muscle_up_rings','hspu_kipping','pullup_butterfly'], false),

-- ============================================================
-- SEPTEMBER 2026 — Peak (4 weeks sampler)
-- ============================================================

('15000001-0000-0000-0000-000000000001', '2026-09-07', 0, 'build', 'sep_2026', 'gymnastics',
 'WOD Rx — Competition Prep',
 'CrossFit WOD Rx. Strategy: first set at 85% max, small sets on MU and HSPU with active rest, reset after broken DU in 3 breaths. Accessory reduced to 2-3x/week.',
 ARRAY['double_unders','hspu_kipping','muscle_up_rings'], false),

('15000001-0000-0000-0000-000000000002', '2026-09-07', 1, 'build', 'sep_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('15000001-0000-0000-0000-000000000003', '2026-09-07', 2, 'build', 'sep_2026', 'olympic_lifting',
 'Olympic Lifting — Competition Focus',
 'Olympic lifting with competition strategy. Pistol Rx in WODs.',
 ARRAY['pistol_squat','snatch_technique','clean_and_jerk_technique'], false),

('15000001-0000-0000-0000-000000000004', '2026-09-07', 3, 'build', 'sep_2026', 'cardio',
 'Zone 2 × 1/week + Handstand Walk',
 'Zone 2: 1 session/week. Handstand walk: target 20m continuous.',
 ARRAY['zone2_cardio','handstand_walk'], false),

('15000001-0000-0000-0000-000000000005', '2026-09-07', 4, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #1 — Strength/Gymnastics',
 'Simulate competition WOD. Strength & gymnastics focus. Chronometer everything. Practice transitions.',
 ARRAY['pullup_butterfly','muscle_up_rings','hspu_kipping','rope_climb'], false),

('15000001-0000-0000-0000-000000000006', '2026-09-07', 5, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #2 — Cardio/Metcon',
 'Simulate competition WOD. Cardio & metcon focus.',
 ARRAY['double_unders','pistol_squat','pullup_butterfly'], false),

('15000002-0000-0000-0000-000000000001', '2026-09-14', 0, 'build', 'sep_2026', 'gymnastics',
 'WOD Rx — Peak Prep',
 'CrossFit WOD Rx. Full competition strategy.',
 ARRAY['double_unders','hspu_kipping','muscle_up_rings'], false),

('15000002-0000-0000-0000-000000000002', '2026-09-14', 1, 'build', 'sep_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('15000002-0000-0000-0000-000000000003', '2026-09-14', 2, 'build', 'sep_2026', 'olympic_lifting',
 'Olympic Lifting Peak',
 'Olympic lifting peak focus.',
 ARRAY['snatch_technique','clean_and_jerk_technique'], false),

('15000002-0000-0000-0000-000000000005', '2026-09-14', 4, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #1',
 'Competition simulation — strength/gymnastics.',
 ARRAY['pullup_butterfly','muscle_up_rings','hspu_kipping','rope_climb'], false),

('15000002-0000-0000-0000-000000000006', '2026-09-14', 5, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #2',
 'Competition simulation — cardio/metcon.',
 ARRAY['double_unders','pistol_squat','pullup_butterfly'], false),

('15000003-0000-0000-0000-000000000001', '2026-09-21', 0, 'build', 'sep_2026', 'gymnastics',
 'WOD Rx — Final Peak',
 'CrossFit WOD Rx. Final competition push.',
 ARRAY['double_unders','hspu_kipping','muscle_up_rings'], false),

('15000003-0000-0000-0000-000000000002', '2026-09-21', 1, 'build', 'sep_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('15000003-0000-0000-0000-000000000003', '2026-09-21', 2, 'build', 'sep_2026', 'olympic_lifting',
 'Olympic Lifting',
 'Olympic lifting.',
 ARRAY['snatch_technique','clean_and_jerk_technique'], false),

('15000003-0000-0000-0000-000000000005', '2026-09-21', 4, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #1',
 'Simulation — strength/gymnastics.',
 ARRAY['pullup_butterfly','muscle_up_rings','hspu_kipping','rope_climb'], false),

('15000003-0000-0000-0000-000000000006', '2026-09-21', 5, 'build', 'sep_2026', 'gymnastics',
 'Competition Simulation #2',
 'Simulation — cardio/metcon.',
 ARRAY['double_unders','pistol_squat','pullup_butterfly'], false),

('15000004-0000-0000-0000-000000000001', '2026-09-28', 0, 'build', 'sep_2026', 'gymnastics',
 'WOD Rx — Final Week Before Competition',
 'Last full WOD week before October competition. Moderate intensity, priority on quality and confidence.',
 ARRAY['double_unders','hspu_kipping','muscle_up_rings'], false),

('15000004-0000-0000-0000-000000000002', '2026-09-28', 1, 'build', 'sep_2026', 'cardio',
 'Padel',
 'Padel.',
 ARRAY[]::text[], false),

('15000004-0000-0000-0000-000000000003', '2026-09-28', 2, 'build', 'sep_2026', 'olympic_lifting',
 'Olympic Lifting — Final Session',
 'Olympic lifting final session before competition month.',
 ARRAY['snatch_technique','clean_and_jerk_technique'], false),

('15000004-0000-0000-0000-000000000005', '2026-09-28', 4, 'build', 'sep_2026', 'gymnastics',
 'Final Skills Review',
 'Review all skills: double unders, pistol squat, muscle-up, HSPU, handstand walk, butterfly pull-ups, rope climb. Moderate volume.',
 ARRAY['double_unders','pistol_squat','muscle_up_rings','hspu_kipping','handstand_walk','pullup_butterfly','rope_climb'], false),

-- ============================================================
-- OCTOBER 2026 — Competition Milestones
-- ============================================================

('16000001-0000-0000-0000-000000000001', '2026-10-05', 0, 'competition', 'oct_2026', 'milestone',
 'October — Competition Month',
 'October is competition milestone month. Use the milestone dashboard to track achievements and log competition results.',
 ARRAY['double_unders','pistol_squat','muscle_up_rings','hspu_strict','hspu_kipping','handstand_walk','pullup_butterfly','rope_climb','pullup_strict'], false),

-- ============================================================
-- TRAVEL BLOCKS (generic, reusable)
-- ============================================================

('99000001-0000-0000-0000-000000000001', '2026-05-04', 0, 'build', 'may_2026', 'travel',
 'Travel — Short Trip Bodyweight Session',
 'Bodyweight only (45-60 min evenings). Push: HSPU progression, pike push-ups, chair dips. Pull: find a bar (park/hotel). If none: towel rows, door frame holds. Legs: pistol squat practice, jump squats, Bulgarian split squat. Core: hollow body, arch, L-sit. Cardio: 20 min zone 2 run.',
 ARRAY['hspu_strict','pullup_strict','pistol_squat','zone2_cardio'], true),

('99000002-0000-0000-0000-000000000001', '2026-05-04', 0, 'build', 'may_2026', 'travel',
 'Travel — Medium Trip Gym Session',
 '45-60 min. Add if gym available: weighted pull-ups, ring work, barbell work (snatch/clean at moderate load). Bodyweight: HSPU 10+ reps, jumping MU or banded if available, handstand walk 15 min dedicated.',
 ARRAY['hspu_strict','pullup_weighted','muscle_up_rings','handstand_walk'], true),

('99000003-0000-0000-0000-000000000001', '2026-05-04', 0, 'build', 'may_2026', 'travel',
 'Travel — Long Trip Mini Cycle',
 'Treat as a training week. Day 1-2: activation, light volume. Day 3-8: full bodyweight sessions + equipment. Day 9-11: peak. Day 12-15: deload, mobility, zone 2.',
 ARRAY['hspu_strict','pullup_strict','pistol_squat','zone2_cardio','handstand_walk'], true)

on conflict (id) do nothing;

-- ============================================================
-- OCTOBER MILESTONE SEEDS (inserted for a placeholder user)
-- These get created per-user when they first view milestones
-- The app creates them via the API, not this seed
-- ============================================================
