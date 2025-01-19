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
    
    const resultDiv = document.getElementById('result');
    let message = '';
    let className = '';

    if (compatibility >= 80) {
        message = `すごい！${compatibility}%の相性です！\n運命的な出会いかもしれません！`;
        className = 'good';
    } else if (compatibility >= 50) {
        message = `${compatibility}%の相性です！\n良い関係を築けそうですね。`;
        className = 'medium';
    } else {
        message = `${compatibility}%の相性です。\n新しい発見があるかもしれません！`;
        className = 'bad';
    }

    resultDiv.textContent = message;
    resultDiv.className = className;
    resultDiv.style.display = 'block';
} 