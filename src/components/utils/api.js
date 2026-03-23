import toast from "react-hot-toast";

const capitalize = str => str[0].toUpperCase() + str.substring(1)

const shuffleArray = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}

const formatZero = n => (Number(n) < 10 ? "0" + String(n) : String(n))

const calcYrs = () => {
    let ageDifMs = Date.now() - 1617235200000;
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const showMobNav = () => {
    document.querySelector("#hamburger svg").classList.add("active")

    document.querySelector("aside.nav_mobile").style.display = "block"
    document.querySelector(".overlay").style.display = "block"

    setTimeout(() => {
        document.querySelector("aside.nav_mobile").classList.toggle("shown")
        document.querySelector(".overlay").classList.toggle("shown")
    }, 1)

    if(!document.querySelector("#hamburger svg").classList.contains("animated"))
        document.querySelector("#hamburger svg").classList.add("animated")
}

const hidenMobNav = () => {
    document.querySelector("#hamburger svg").classList.remove("active")

    document.querySelector("aside.nav_mobile").classList.remove("shown")
    document.querySelector(".overlay").classList.remove("shown")

    setTimeout(() => {
        document.querySelector("aside.nav_mobile").style.display = "none"
        document.querySelector(".overlay").style.display = "none"
    }, 400)
}

const toastSucc = message => {
    toast.success(message, {
        style: {
            border: '2px solid #021E3D',
            borderRadius: '10px',
            background: '#01152B',
            color: '#fff',
        },
        
        iconTheme: {
            primary: '#0A7CFF',
            secondary: '#FFFAEE',
        },
    })
}

const toastErr = message => {
    toast.error(message, {
        style: {
            border: '2px solid #3D021E',
            borderRadius: '10px',
            background: '#2B010F',
            color: '#fff',
        },
        iconTheme: {
            primary: '#FF4D4F',
            secondary: '#FFFAEE',
        },
    });
};

const openDialog = () => {
    document.querySelector(".overlay_dialog").style.display = "flex"

    setTimeout(() => {
        document.querySelector(".overlay_dialog").classList.toggle("shown")
        document.querySelector(".overlay_dialog .dialog_box").style.animation = "zoom-in-95 200ms ease-out forwards"
    }, 1)
};

const closeDialog = () => {
    document.querySelector(".overlay_dialog .dialog_box").style.animation = "zoom-out-95 200ms ease-out forwards"
    document.querySelector(".overlay_dialog").classList.remove("shown")

    setTimeout(() => {
        document.querySelector(".overlay_dialog").style.display = "none"
    }, 400)
}

export {
    capitalize,
    shuffleArray,
    
    formatZero,
    calcYrs,

    showMobNav,
    hidenMobNav,

    toastSucc,
    toastErr,

    openDialog,
    closeDialog
}