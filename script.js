// 干支の配列
const zodiacSigns = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 星座の配列と日付範囲
const constellations = [
    { name: "山羊座", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: "水瓶座", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: "魚座", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: "牡羊座", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: "牡牛座", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: "双子座", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
    { name: "蟹座", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
    { name: "獅子座", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: "乙女座", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: "天秤座", startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
    { name: "蠍座", startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
    { name: "射手座", startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 }
];

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    initDateSelects('year1', 'month1', 'day1');
    initDateSelects('year2', 'month2', 'day2');
});

// 年月日のセレクトボックスを初期化
function initDateSelects(yearId, monthId, dayId) {
    const yearSelect = document.getElementById(yearId);
    const monthSelect = document.getElementById(monthId);
    const daySelect = document.getElementById(dayId);
    
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
}

// 干支を取得
function getZodiacSign(year) {
    return zodiacSigns[(year - 4) % 12];
}

// 星座を取得
function getConstellation(month, day) {
    for (const constellation of constellations) {
        if (constellation.startMonth === month && day >= constellation.startDay) {
            return constellation.name;
        }
        if (constellation.endMonth === month && day <= constellation.endDay) {
            return constellation.name;
        }
        if (constellation.startMonth === 12 && month === 1 && day <= constellation.endDay) {
            return constellation.name;
        }
        if (constellation.startMonth === 12 && month === 12 && day >= constellation.startDay) {
            return constellation.name;
        }
    }
    return constellations.find(c => 
        (month === c.startMonth && day >= c.startDay) || 
        (month === c.endMonth && day <= c.endDay)
    ).name;
}

// 干支の相性を計算
function calculateZodiacCompatibility(zodiac1, zodiac2) {
    const index1 = zodiacSigns.indexOf(zodiac1);
    const index2 = zodiacSigns.indexOf(zodiac2);
    const difference = Math.abs(index1 - index2);
    
    // 干支の相性ルール（単純な例）
    if (difference === 0) return 100; // 同じ干支
    if (difference === 6) return 30;  // 対極の干支
    if (difference === 4 || difference === 8) return 80; // 三合
    if (difference === 3 || difference === 9) return 60; // 四極
    return 50; // その他
}

// 星座の相性を計算
function calculateConstellationCompatibility(const1, const2) {
    // 星座の相性ルール（実際にはもっと複雑なルールを実装可能）
    const elementMap = {
        "牡羊座": "火", "獅子座": "火", "射手座": "火",
        "牡牛座": "地", "乙女座": "地", "山羊座": "地",
        "双子座": "風", "天秤座": "風", "水瓶座": "風",
        "蟹座": "水", "蠍座": "水", "魚座": "水"
    };
    
    const element1 = elementMap[const1];
    const element2 = elementMap[const2];
    
    if (const1 === const2) return 90; // 同じ星座
    if (element1 === element2) return 80; // 同じ元素
    
    // 相性の良い元素の組み合わせ
    const goodPairs = {
        "火": "風", "風": "火",
        "地": "水", "水": "地"
    };
    
    if (goodPairs[element1] === element2) return 70;
    return 50; // その他の組み合わせ
}

// 相性を計算する関数
function calculateCompatibility() {
    // 入力値を取得
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    const year1 = parseInt(document.getElementById('year1').value);
    const month1 = parseInt(document.getElementById('month1').value);
    const day1 = parseInt(document.getElementById('day1').value);
    const year2 = parseInt(document.getElementById('year2').value);
    const month2 = parseInt(document.getElementById('month2').value);
    const day2 = parseInt(document.getElementById('day2').value);

    if (!name1 || !name2 || !year1 || !year2 || !month1 || !month2 || !day1 || !day2) {
        alert('すべての項目を入力してください！');
        return;
    }

    // 各種相性を計算
    const nameCompatibility = calculateNameCompatibility(name1, name2);
    const zodiac1 = getZodiacSign(year1);
    const zodiac2 = getZodiacSign(year2);
    const zodiacCompatibility = calculateZodiacCompatibility(zodiac1, zodiac2);
    const constellation1 = getConstellation(month1, day1);
    const constellation2 = getConstellation(month2, day2);
    const constellationCompatibility = calculateConstellationCompatibility(constellation1, constellation2);

    // 総合相性を計算（重み付け）
    const totalCompatibility = Math.round(
        (nameCompatibility * 0.3) + 
        (zodiacCompatibility * 0.35) + 
        (constellationCompatibility * 0.35)
    );

    // 結果を表示
    displayResults({
        total: totalCompatibility,
        name: nameCompatibility,
        zodiac: zodiacCompatibility,
        constellation: constellationCompatibility,
        zodiac1, zodiac2,
        constellation1, constellation2,
        name1, name2
    });
}

// 名前の相性を計算
function calculateNameCompatibility(name1, name2) {
    const combined = name1 + name2;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = ((hash << 5) - hash) + combined.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash % 101);
}

// 結果を表示
function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    // 総合相性
    document.querySelector('.bar-fill.total').style.width = `${results.total}%`;
    document.querySelector('.detail-item:nth-child(1) .percentage').textContent = `${results.total}%`;

    // 名前の相性
    document.querySelector('.bar-fill.name').style.width = `${results.name}%`;
    document.querySelector('.detail-item:nth-child(2) .percentage').textContent = `${results.name}%`;

    // 干支の相性
    document.querySelector('.bar-fill.zodiac').style.width = `${results.zodiac}%`;
    document.querySelector('.detail-item:nth-child(3) .percentage').textContent = `${results.zodiac}%`;
    document.querySelector('.zodiac-message').textContent = 
        `${results.name1}さん(${results.zodiac1})と${results.name2}さん(${results.zodiac2})の干支の相性は${results.zodiac}%です。`;

    // 星座の相性
    document.querySelector('.bar-fill.constellation').style.width = `${results.constellation}%`;
    document.querySelector('.detail-item:nth-child(4) .percentage').textContent = `${results.constellation}%`;
    document.querySelector('.constellation-message').textContent = 
        `${results.name1}さん(${results.constellation1})と${results.name2}さん(${results.constellation2})の星座の相性は${results.constellation}%です。`;

    // 総合メッセージ
    const message = document.querySelector('.message');
    let totalMessage;
    if (results.total >= 80) {
        totalMessage = `運命的な出会いかもしれません！${results.total}%という素晴らしい相性です。`;
        resultDiv.className = 'excellent';
    } else if (results.total >= 60) {
        totalMessage = `${results.total}%の相性で、とても良い関係を築けそうです。`;
        resultDiv.className = 'good';
    } else if (results.total >= 40) {
        totalMessage = `${results.total}%の相性です。時間をかけて理解を深められそうです。`;
        resultDiv.className = 'normal';
    } else {
        totalMessage = `${results.total}%の相性です。違いを活かして新しい発見があるかもしれません！`;
        resultDiv.className = 'challenging';
    }
    message.textContent = totalMessage;
}
