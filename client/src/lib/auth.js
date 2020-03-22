const auth = {
    isAuthenticated: false,
};

const checkAuth = () => {
    const me = localStorage.getItem('wearehere');
    console.log(me);
    if (me && me !== '') {
        auth.isAuthenticated = true;
    }
};

const deauth = () => {
    localStorage.clear();
    auth.isAuthenticated = false;
    window.location.href = '/login';
};

export {
    auth, checkAuth, deauth,
};
  