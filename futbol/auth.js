// auth.js — simple client-side demo auth using localStorage
(function(){
    const USERS_KEY = 'llorones.fc_user';
    const LOGGED_KEY = 'llorones.fc_logged_in';
    const NAME_KEY = 'llorones.fc_logged_name';

    function getUser(){
        try{ return JSON.parse(localStorage.getItem(USERS_KEY)) || null }catch(e){ return null }
    }

    function saveUser(u){
        localStorage.setItem(USERS_KEY, JSON.stringify(u));
    }

    function signup(name,email,password){
        // backwards-compatible simple signup (delegates to profile signup)
        return signupProfile({
            name: name,
            email: email,
            password: password
        });
    }

    function signupProfile(profile){
        // profile expected to include: name,email,password and optional fields
        if(!profile || !profile.name || !profile.email || !profile.password) return {ok:false, msg:'Complete los campos obligatorios'};
        const u = getUser();
        if(u && u.email === profile.email) return {ok:false, msg:'El correo ya está registrado'};
        // age validation if provided
        if(profile.age){
            const age = Number(profile.age);
            if(Number.isNaN(age) || age < 14 || age > 25) return {ok:false, msg:'Edad debe ser entre 14 y 25 años'};
        }
        // Discipline check (expects 'yes' or 'no' or boolean)
        if(typeof profile.discipline !== 'undefined'){
            const disc = profile.discipline === true || profile.discipline === 'yes' || profile.discipline === 'true';
            if(!disc){
                return {ok:false, msg:'ents pa que quiere estudiar? mejor dedicarte a otro deporte'};
            }
        }
        // save full profile
        saveUser(profile);
        localStorage.setItem(LOGGED_KEY, '1');
        localStorage.setItem(NAME_KEY, profile.name);
        return {ok:true};
    }

    function login(email,password){
        const u = getUser();
        if(!u) return {ok:false, msg:'No existe cuenta registrada'};
        if(u.email === email && u.password === password){
            localStorage.setItem(LOGGED_KEY, '1');
            localStorage.setItem(NAME_KEY, u.name);
            return {ok:true, name: u.name};
        }
        return {ok:false, msg:'Credenciales incorrectas'};
    }

    function isLoggedIn(){ return localStorage.getItem(LOGGED_KEY) === '1' }
    function logout(){ localStorage.removeItem(LOGGED_KEY); localStorage.removeItem(NAME_KEY) }
    function getLoggedName(){ return localStorage.getItem(NAME_KEY) || '' }

    window.auth = { getUser, saveUser, signup, signupProfile, login, isLoggedIn, logout, getLoggedName };
})();
