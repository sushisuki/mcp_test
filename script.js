function calculateCompatibility() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if (!name1 || !name2) {
        alert('両方の名前を入力してください！');
        return;
    }

    // 名前の文字列を結合してハッシュ値を生成
    const combined = name1 + name2;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = ((hash << 5) - hash) + combined.charCodeAt(i);
        hash = hash & hash;
    }

    // 0-100の範囲で相性値を生成
    const compatibility = Math.abs(hash % 101);
    
    // 結果の表示を更新
    const resultDiv = document.getElementById('result');
    const resultText = resultDiv.querySelector('.result-text');
    const barFill = resultDiv.querySelector('.bar-fill');
    const message = resultDiv.querySelector('.message');

    // アニメーション用にクラスをリセット
    resultDiv.classList.remove('hidden', 'excellent', 'good', 'normal', 'challenging');

    // 相性値に応じてメッセージと表示を設定
    let messageText = '';
    let className = '';

    if (compatibility >= 80) {
        messageText = `運命的な出会いかもしれません！\n${name1}さんと${name2}さんの相性は抜群です！`;
        className = 'excellent';
    } else if (compatibility >= 60) {
        messageText = `${name1}さんと${name2}さんは良い関係を築けそうです。\n互いを理解し合える素晴らしい関係になれるでしょう。`;
        className = 'good';
    } else if (compatibility >= 40) {
        messageText = `${name1}さんと${name2}さんは徐々に理解を深められそうです。\n時間をかけることで、より良い関係を築けるかもしれません。`;
        className = 'normal';
    } else {
        messageText = `${name1}さんと${name2}さんの関係には少し工夫が必要かもしれません。\n違いを認め合うことで、新しい発見があるかもしれません！`;
        className = 'challenging';
    }

    // 結果を表示
    resultText.textContent = `相性は${compatibility}%です！`;
    message.textContent = messageText;
    barFill.style.width = `${compatibility}%`;
    resultDiv.classList.add(className);
}