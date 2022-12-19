function ballsAnimation() {
    const colors = ["#00FFFF", "#00008B", "#1E90FF", "#00FFFF", "#7B68EE", "#40E0D0"];

    const numBalls = 100;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 90)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 5)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;

        balls.push(ball);
        document.body.append(ball);
    }

    balls.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 1.1
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ], {
                duration: (Math.random() + 1) * 2000,
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });

}