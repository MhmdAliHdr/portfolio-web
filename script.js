setInterval(fetch("posts.txt").then((res) => res.text()).then((text) => {
    const lines = text.split("\n");
    lines.forEach(line => {
        const posts = document.getElementsByClassName("vertical-menu")[0];
        const post = document.createElement("div");
        const post_title = document.createElement("div");
        const post_content = document.createElement("div");
        const post_list = line.split("-");
        const subject = post_list[0];
        const content = post_list[1];
        post.classList.add("post");
        post_title.classList.add("post-title");
        post_content.classList.add("post-content");
        post_title.innerText = subject;
        post_content.innerText = content;
        post.appendChild(post_title);
        post.appendChild(post_content);
        posts.appendChild(post);
    });
}).catch((e) => console.error(e)), 1000);