import {
    zodiacSigns,
    constellations,
    elementMap,
    compatibleElements,
    messages,
    weights
} from './config.js';

// フォーム送信ハンドラ
function handleSubmit(event) {
    event.preventDefault();
    clearErrors();
    showLoading();

    try {
        calculateCompatibility();
    } catch (error) {
        console.error('相性計算中にエラーが発生しました:', error);
        showError('計算中にエラーが発生しました。入力を確認してください。');
    } finally {
        hideLoading();
    }
}

// エラー表示関連の関数
function showError(message) {
    const errorDiv = document.getElementById('errorMessages');
    errorDiv.textContent = message;
    errorDiv.classList.add('visible');
}

function clearErrors() {
    const errorDiv = document.getElementById('errorMessages');
    errorDiv.textContent = '';
    errorDiv.classList.remove('visible');
}

// ローディング表示の制御
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    initDateSelects('year1', 'month1', 'day1');
    initDateSelects('year2', 'month2', 'day2');
    
    // フォームのイベントリスナーを設定
    document.getElementById('compatibilityForm').addEventListener('submit', handleSubmit);
});

// 年月日のセレクトボックスを初期化
function initDateSelects(yearId, monthId, dayId) {
    const yearSelect = document.getElementById(yearId);
    const monthSelect = document.getElementById(monthId);
    const daySelect = document.getElementById(dayId);
    
    try {
        // 年の選択肢を設定（1920年から現在まで）
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1920; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        
        // 月の選択肢を設定
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            monthSelect.appendChild(option);
        }
        
        // 日付の更新関数
        function updateDays() {
            const year = parseInt(yearSelect.value);
            const month = parseInt(monthSelect.value);
            const daysInMonth = new Date(year, month, 0).getDate();
            
            // 現在の日付を保持
            const currentDay = daySelect.value;
            
            daySelect.innerHTML = '';
            for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
            }
            
            // 可能であれば前の日付を復元
            if (currentDay && currentDay <= daysInMonth) {
                daySelect.value = currentDay;
            }
        }
        
        // イベントリスナーを設定
        yearSelect.addEventListener('change', updateDays);
        monthSelect.addEventListener('change', updateDays);
        
        // デフォルト値を設定
        yearSelect.value = currentYear - 25;
        monthSelect.value = 1;
        updateDays();
        daySelect.value = 1;
    } catch (error) {
        console.error('日付セレクトボックスの初期化中にエラーが発生しました:', error);
        showError('日付の設定中にエラーが発生しました。ページを更新してください。');
    }
}

// 干支を取得
function getZodiacSign(year) {
    try {
        return zodiacSigns[(year - 4) % 12];
    } catch (error) {
        throw new Error('干支の計算中にエラーが発生しました: ' + error.message);
    }
}

// 星座を取得
function getConstellation(month, day) {
    try {
        return constellations.find(c => {
            if (c.startMonth === 12 && month === 1 && day <= c.endDay) return true;
            if (c.startMonth === 12 && month === 12 && day >= c.startDay) return true;
            if (c.startMonth === month && day >= c.startDay) return true;
            if (c.endMonth === month && day <= c.endDay) return true;
            return false;
        })?.name;
    } catch (error) {
        throw new Error('星座の計算中にエラーが発生しました: ' + error.message);
    }
}

// 干支の相性を計算
function calculateZodiacCompatibility(zodiac1, zodiac2) {
    try {
        const index1 = zodiacSigns.indexOf(zodiac1);
        const index2 = zodiacSigns.indexOf(zodiac2);
        const difference = Math.abs(index1 - index2);
        
        if (difference === 0) return 100; // 同じ干支
        if (difference === 6) return 30;  // 対極の干支
        if (difference === 4 || difference === 8) return 80; // 三合
        if (difference === 3 || difference === 9) return 60; // 四極
        return 50; // その他
    } catch (error) {
        throw new Error('干支の相性計算中にエラーが発生しました: ' + error.message);
    }
}

// 星座の相性を計算
function calculateConstellationCompatibility(const1, const2) {
    try {
        if (const1 === const2) return 90; // 同じ星座
        
        const element1 = elementMap[const1];
        const element2 = elementMap[const2];
        
        if (element1 === element2) return 80; // 同じ元素
        if (compatibleElements[element1] === element2) return 70; // 相性の良い元素
        return 50; // その他
    } catch (error) {
        throw new Error('星座の相性計算中にエラーが発生しました: ' + error.message);
    }
}

// 名前の相性を計算
function calculateNameCompatibility(name1, name2) {
    try {
        const combined = name1 + name2;
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash % 101);
    } catch (error) {
        throw new Error('名前の相性計算中にエラーが発生しました: ' + error.message);
    }
}

// 入力値の取得とバリデーション
function getValidatedInputs() {
    const inputs = {
        name1: document.getElementById('name1').value,
        name2: document.getElementById('name2').value,
        year1: parseInt(document.getElementById('year1').value),
        month1: parseInt(document.getElementById('month1').value),
        day1: parseInt(document.getElementById('day1').value),
        year2: parseInt(document.getElementById('year2').value),
        month2: parseInt(document.getElementById('month2').value),
        day2: parseInt(document.getElementById('day2').value)
    };

    if (!Object.values(inputs).every(Boolean)) {
        throw new Error('すべての項目を入力してください');
    }

    return inputs;
}

// 相性を計算する関数
function calculateCompatibility() {
    try {
        const inputs = getValidatedInputs();
        
        // 各種相性を計算
        const nameCompatibility = calculateNameCompatibility(inputs.name1, inputs.name2);
        const zodiac1 = getZodiacSign(inputs.year1);
        const zodiac2 = getZodiacSign(inputs.year2);
        const zodiacCompatibility = calculateZodiacCompatibility(zodiac1, zodiac2);
        const constellation1 = getConstellation(inputs.month1, inputs.day1);
        const constellation2 = getConstellation(inputs.month2, inputs.day2);
        const constellationCompatibility = calculateConstellationCompatibility(constellation1, constellation2);

        // 総合相性を計算（重み付け）
        const totalCompatibility = Math.round(
            (nameCompatibility * weights.name) +
            (zodiacCompatibility * weights.zodiac) +
            (constellationCompatibility * weights.constellation)
        );

        displayResults({
            total: totalCompatibility,
            name: nameCompatibility,
            zodiac: zodiacCompatibility,
            constellation: constellationCompatibility,
            zodiac1,
            zodiac2,
            constellation1,
            constellation2,
            name1: inputs.name1,
            name2: inputs.name2
        });

    } catch (error) {
        throw new Error('相性計算中にエラーが発生しました: ' + error.message);
    }
}

// 結果を表示
function displayResults(results) {
    try {
        const resultDiv = document.getElementById('result');
        resultDiv.classList.remove('hidden', 'excellent', 'good', 'normal', 'challenging');

        // プログレスバーとパーセンテージを更新
        updateProgressBar('.total', results.total);
        updateProgressBar('.name', results.name);
        updateProgressBar('.zodiac', results.zodiac);
        updateProgressBar('.constellation', results.constellation);

        // メッセージを更新
        document.querySelector('.zodiac-message').textContent =
            `${results.name1}さん(${results.zodiac1})と${results.name2}さん(${results.zodiac2})の干支の相性は${results.zodiac}%です。`;
        
        document.querySelector('.constellation-message').textContent =
            `${results.name1}さん(${results.constellation1})と${results.name2}さん(${results.constellation2})の星座の相性は${results.constellation}%です。`;

        // 総合結果のメッセージを設定
        const messageKey = results.total >= 80 ? 'excellent' :
                          results.total >= 60 ? 'good' :
                          results.total >= 40 ? 'normal' :
                          'challenging';

        resultDiv.classList.add(messageKey);
        document.querySelector('.message').textContent = messages[messageKey](results.total);

        // 結果を表示
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        throw new Error('結果の表示中にエラーが発生しました: ' + error.message);
    }
}

// プログレスバーの更新
function updateProgressBar(selector, value) {
    const bar = document.querySelector(`.bar-fill${selector}`);
    const percentage = bar.parentElement.querySelector('.percentage');
    const progressBar = bar.parentElement;

    bar.style.width = `${value}%`;
    percentage.textContent = `${value}%`;
    progressBar.setAttribute('aria-valuenow', value);
}

// グローバルスコープにエクスポート
window.handleSubmit = handleSubmit;