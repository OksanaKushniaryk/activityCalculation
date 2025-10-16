Activity score
AS = 0.25 * SS + 0.25 * AMS + 0.15 * CS + 0.1 * GCS + 0.25 * TECS

SS - Steps Score, 
AMS - Active Minutes Score, 
CS - Consistency Score,   
GCS - Gini Coefficient Score, 
TECS - Total Energy Credit Score

Steps Score 

SS = 100 × exp^((x - μ)^2 / (2σ^2)) if x < μ

x - today’s steps = 624,
μ - personal baseline steps
σ - acceptable deviation (= 2000) = standard deviation

μ = Σ(w * x)/7

Once 7-day data is available AND if steps_weekTotal > (μ x 5)
w - total number of steps across the 7 days (steps_weekTotal)

steps_weekTotal = [1, 1, 1, 1, 2, 2, 3]/11

μ = 8000 if 7-day data is NOT available AND if steps_weekTotal <= (μ x 5)

SS = 100 if x ≥ μ

Обчислення:

Day 1 = 3719 steps
Day 2 = 9077 steps
Day 3 = 6028 steps
Day 4 = 2446 steps
Day 5 = 6193 steps
Day 6 = 5852 steps
Day 7 = 624 steps

Вхідні дані
Сьогоднішні кроки x=624


σ=2000
7-денні кроки: [3719, 9077, 6028, 2446, 6193, 5852, 624]


Ваги на тиждень: [1,1,1,1,2,2,3]/11 → нормовані ваги: [1/11,1/11,1/11,1/11,2/11,2/11,3/11]

Крок 1 — Обчислення μ\muμ (зважене 7-денне середнє)

Перевірка умови:
 Тижневий підсумок = 33939 кроків, 5μ ≈ 21469.09.
 Оскільки 33939>5μ, використовуємо це μ (згідно з твоїм правилом).
 
Крок 2 — Вибір формули

Оскільки x<μ (624 < 4293.82), застосовуємо експоненціальне згасання.
Примітка: я використовую негативний знак у показнику (гаусівське згасання), інакше результат перевищить 100.
SS = 100 × exp^((x - μ)^2 / (2σ^2)) if x < μ

Крок 3 — Обчислення SS

Результат
SS = 18.57 (з точністю до двох знаків)




****
