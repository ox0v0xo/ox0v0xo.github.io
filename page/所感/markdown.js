const markdown = {
  parse: function (md) {
    // 处理代码块
    let html = md.replace(/```([\s\S]*?)```/g, (_, code) => {
      return `<pre class="markdown-pre"><code>${code.trim()}</code></pre>`;
    });

    // 处理标题
    html = html
      .replace(/^# (.*)/gm, '<h1 class="markdown-h1">$1</h1>')
      .replace(/^## (.*)/gm, '<h2 class="markdown-h2">$1</h2>')
      .replace(/^### (.*)/gm, '<h3 class="markdown-h3">$1</h3>');

    // 处理加粗/斜体
    html = html
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // 处理段落
    html = html
      .split("\n\n")
      .map((para) => {
        if (!para.match(/^<(\/)?(h|pre|ul|ol|li)/)) {
          return `<p class="markdown-p">${para.replace(/\n/g, " ")}</p>`;
        }
        return para;
      })
      .join("\n");

    return html;
  },
};
