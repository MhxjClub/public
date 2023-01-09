// If you don't want the particles, change the following to false
const doParticles = true;




// Do not mess with the rest of this file unless you know what you're doing

const getWidth = () => { // credit to travis on stack overflow
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};

if (doParticles) {
    console.log("Frk's Notice")
    console.log("此模板来自Github/SpigotMC")
    console.log("Github地址 https://github.com/bybilly/minecraft-web-portal")

    if (getWidth() < 400) $.firefly({
        minPixel: 1,
        maxPixel: 2,
        total: 100
    });
    else $.firefly({
        minPixel: 1,
        maxPixel: 3,
        total: 100
    });
}

// This is for the click to copy
let t;
$(document).ready(() => {
    t = $(".ip").html();
});

$(document).on("click", ".ip", () => {
    let copy = document.createElement("textarea");
    copy.style.position = "absolute";
    copy.style.left = "-99999px";
    copy.style.top = "0";
    copy.setAttribute("id", "ta");
    document.body.appendChild(copy);
    copy.textContent = t;
    copy.select();
    document.execCommand("copy");
    $(".ip").html("<span class='extrapad'>IP已复制！</span>");
    setTimeout(() => {
        $(".ip").html(t);
        var copy = document.getElementById("ta");
        copy.parentNode.removeChild(copy);
    }, 800);
});

// This is to fetch the player count
$(document).ready(() => {
    let ip = $(".sip").attr("data-ip");
    let port = $(".sip").attr("data-port");
    let sb = $(".lag").attr("data-lag");
    if (port == "" || port == null) port = "25565";
    updatePlayercount(ip, port);
    // Updates every minute (not worth changing due to API cache)
    setInterval(() => {
        updatePlayercount(ip, port);
    }, 2500);
});

const updatePlayercount = (ip, port) => {
        $.get(`https://api.fanet.top/mc-stats/index.php?adress=mc.fanet.top&port=25565`, (result) => {
        if (result.hasOwnProperty('players')) {
            $(".sip").html(result.players);
             $(".lag").html(result.ping);
             $(".ol").html("在线");
             $(".max").html(result.maxplayers);
        } else {
            $(".ol").html("离线");
             $(".sip").html("-1");
        }
    });
    }