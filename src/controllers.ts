export const homeCtrl = (req, res): void => {
  const pageContent: string = `
    <h1>Homepage</h1>
    <p>
      Welcome to this amazing homepage full of surprises (or not) !
    </p>
    <a href="/about">👉 About us</a>
  `;

  res.send(pageContent);
};

export const aboutCtrl = (req, res): void => {
  const pageContent: string  = `
    <h1>About us</h1>
    <img src="https://media.giphy.com/media/RddAJiGxTPQFa/giphy.gif" /><br>
    <a href="/">👉 Homepage</a>
  `;

  res.send(pageContent);
};