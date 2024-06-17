(function() {
    'use strict';

    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d')

    var Hack = {
        xray: 0,
    }
    window.Hack = Hack

    ctx.drawImage = new Proxy( ctx.drawImage, {

        apply() {
            if ( Hack.xray ) arguments[1].globalAlpha = .5;
            return Reflect.apply(...arguments)
        }

    })

    window.addEventListener('keydown', (e) => {

        if ( e.code == 'KeyF'&& document.getElementById("chat_block").style.display !== "inline-block" ) Hack.xray = !Hack.xray

    })
    const screenViewport = {
        width: 3800,
        height: 3800
    }

    Object.defineProperty(window, 'screen', {
        get() {
            return screenViewport;
        },
        configurable: true
    });

    const symbol = Symbol("opacity");
    Object.defineProperty(Object.prototype, 'opacity', {
        get() {
            this[symbol] = 0.5
            return this[symbol];
        }
    });
    const original = setTimeout;
    setTimeout = function (fn, delay, ...args) {
        if (delay === 33) delay = 1;
        return original.call(this, fn, delay, ...args);
    };
})();