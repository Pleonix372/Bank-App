export const SESSION_KEY = "sessionAuth";

export const saveSession = (session) => {
  try {
    window.session = session;

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.log(err);
    window.session = null;
  }
};

export const loadSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (session) {
      window.session = session;
      return session;
    }

    window.session = null;
    return null;
  } catch (err) {
    console.error(err);
    window.session = null;
    return null;
  }
};

export const getTokenSession = () => {
  try {
    const session = getSession();

    return session ? session.token : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUserSession = () => {
  try {
    const session = getSession();

    return session ? session.user.id : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSession = () => {
  try {
    const session =
      JSON.parse(localStorage.getItem(SESSION_KEY)) || window.session;

    return session || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
