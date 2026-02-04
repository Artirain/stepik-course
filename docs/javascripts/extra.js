/**
 * Квиз-виджет для курса "Полное руководство по Claude Code"
 *
 * Использование в markdown (md_in_html):
 *
 * <div class="quiz-block" data-quiz-id="u01-q1" data-answer="b">
 *   <div class="quiz-question">Текст вопроса?</div>
 *   <label><input type="radio" name="u01-q1" value="a"> Вариант A</label>
 *   <label><input type="radio" name="u01-q1" value="b"> Вариант B</label>
 *   <label><input type="radio" name="u01-q1" value="c"> Вариант C</label>
 *   <button class="quiz-btn" onclick="checkQuiz(this)">Проверить</button>
 *   <div class="quiz-result"></div>
 * </div>
 *
 * Для множественного выбора — data-answer="a,c" и type="checkbox".
 */

function checkQuiz(btn) {
  var block = btn.closest('.quiz-block');
  if (!block) return;

  var quizId = block.getAttribute('data-quiz-id');
  var correctRaw = block.getAttribute('data-answer');
  var resultDiv = block.querySelector('.quiz-result');
  if (!resultDiv) return;

  var correctSet = correctRaw.split(',').map(function(s) { return s.trim(); }).sort();

  // Собираем выбранные ответы
  var inputs = block.querySelectorAll('input:checked');
  var selected = [];
  inputs.forEach(function(inp) {
    selected.push(inp.value.trim());
  });
  selected.sort();

  if (selected.length === 0) {
    resultDiv.className = 'quiz-result incorrect';
    resultDiv.textContent = 'Выбери хотя бы один вариант!';
    return;
  }

  var isCorrect = selected.length === correctSet.length &&
    selected.every(function(val, idx) { return val === correctSet[idx]; });

  if (isCorrect) {
    resultDiv.className = 'quiz-result correct';
    resultDiv.textContent = 'Правильно!';
  } else {
    resultDiv.className = 'quiz-result incorrect';
    resultDiv.textContent = 'Неправильно. Попробуй ещё раз!';
  }

  // Сохраняем результат в localStorage
  if (quizId) {
    try {
      var key = 'quiz-' + quizId;
      localStorage.setItem(key, isCorrect ? '1' : '0');
    } catch (e) { /* localStorage недоступен */ }
  }

  updateSummary();
}

function updateSummary() {
  var summaryEl = document.querySelector('.quiz-summary');
  if (!summaryEl) return;

  var blocks = document.querySelectorAll('.quiz-block');
  var total = blocks.length;
  var correct = 0;

  blocks.forEach(function(block) {
    var res = block.querySelector('.quiz-result');
    if (res && res.classList.contains('correct')) {
      correct++;
    }
  });

  summaryEl.textContent = 'Результат: ' + correct + ' из ' + total + ' правильно';
}

// Восстанавливаем состояние при загрузке (SPA-навигация MkDocs Material)
document.addEventListener('DOMContentLoaded', restoreQuizState);
if (typeof document$ !== 'undefined') {
  document$.subscribe(function() { restoreQuizState(); });
}

function restoreQuizState() {
  var blocks = document.querySelectorAll('.quiz-block');
  blocks.forEach(function(block) {
    var quizId = block.getAttribute('data-quiz-id');
    if (!quizId) return;
    try {
      var saved = localStorage.getItem('quiz-' + quizId);
      if (saved === '1') {
        var resultDiv = block.querySelector('.quiz-result');
        if (resultDiv) {
          resultDiv.className = 'quiz-result correct';
          resultDiv.textContent = 'Правильно!';
        }
      }
    } catch (e) { /* ignore */ }
  });
  updateSummary();
}
