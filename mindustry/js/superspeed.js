//SPDX license: GPL-3.0-only
//the license is in "../../LICENSE",
//eval(new java.lang.String(new java.net.URL("http://localhost:8080/js/superspeed.js").openStream().readAllBytes(),"UTF-8").toString()) //for localhost
//eval(new java.lang.String(new java.net.URL("https://github.com/francisco000000000/MiniProjects/raw/refs/heads/main/mindustry/js/superspeed.js").openStream().readAllBytes(),"UTF-8").toString())

if(typeof superSpeedUpdate!="undefined"){
    Core.app.removeListener(superSpeedUpdate);
    superSpeedUpdate=null;
    fristexec=false
} else {
    superSpeed=false;
    speedMultiplier=2;
    fristexec=true;
    downloadRepo="https://github.com/francisco000000000/MiniProjects/raw/refs/heads/main/mindustry/js/"
    //downloadRepo="http://localhost:8080/js/" //localhost

    //Download the locale.js and execute!
    eval(new java.lang.String(new java.net.URL(downloadRepo+"locale.js").openStream().readAllBytes(),"UTF-8").toString());

    //Keybinds
    superSpeedKey=KeyBind.add(locale.get("superSpeed"),KeyCode.z,locale.get("superSpeed"));
    speedDownKey=KeyBind.add(locale.get("speedDown"),KeyCode.comma,locale.get("superSpeed"));
    speedUpKey=KeyBind.add(locale.get("speedUp"),KeyCode.period,locale.get("superSpeed"));

    //Buttons
    speedTable=new Packages.arc.scene.ui.layout.Table();
    speedButtons=new Packages.arc.scene.ui.layout.Table();

    speedMinus=new Packages.arc.scene.ui.TextButton("-");
    speedToggle=new Packages.arc.scene.ui.TextButton("E");
    speedPlus=new Packages.arc.scene.ui.TextButton("+");

    speedSize=Packages.arc.scene.ui.layout.Scl.scl(55);

    speedButtons.add(speedMinus).size(speedSize).pad(3);
    speedButtons.add(speedToggle).size(speedSize).pad(3);
    speedButtons.add(speedPlus).size(speedSize).pad(3);

    speedTable.add(speedButtons);
    Core.scene.add(speedTable);
    speedTable.pack();

    speedTable.setPosition(
        Core.graphics.getWidth()-speedTable.getWidth()-20,
        20
    );

    speedListener=new JavaAdapter(Packages.arc.scene.event.InputListener,{
        touchDown:function(e,x,y,pointer,button){
            this.ox=x;
            this.oy=y;
            return true;
        },
        touchDragged:function(e,x,y,pointer){
            var nx=speedTable.x+x-this.ox;
            var ny=speedTable.y+y-this.oy;

            speedTable.x=Math.max(0,Math.min(nx,Core.graphics.getWidth()-speedTable.getWidth()));
            speedTable.y=Math.max(0,Math.min(ny,Core.graphics.getHeight()-speedTable.getHeight()));
        }
    });

    speedTable.addListener(speedListener);

    speedToggle.clicked(function(){
        superSpeed=!superSpeed;
        Vars.ui.showInfoToast(
            locale.get("superSpeed")+": "+
            (superSpeed?locale.get("enabled"):locale.get("disabled")),
            2
        );
    });

    speedMinus.clicked(function(){
        speedMultiplier=Math.max(1,speedMultiplier-1);
        Vars.ui.showInfoToast(
            locale.get("speed")+" "+speedMultiplier+"x",
            2
        );
    });

    speedPlus.clicked(function(){
        speedMultiplier++;
        Vars.ui.showInfoToast(
            locale.get("speed")+" "+speedMultiplier+"x",
            2
        );
    });

    //Check if Super Speed is disabled or a TextField has focus
    TabOpen=function(textField){
        return !superSpeed||textField;
    };
}

superSpeedLastUpdate=0;
superSpeedUpdate=new Packages.arc.ApplicationListener({
    update:function(){
        var textField=Core.scene.getKeyboardFocus() instanceof Packages.arc.scene.ui.TextField;

        //Keybinds
        if(!textField){
            if(Core.input.keyTap(superSpeedKey)){
                superSpeed=!superSpeed;
                Vars.ui.showInfoToast(
                    locale.get("superSpeed")+": "+
                    (superSpeed?locale.get("enabled"):locale.get("disabled")),
                    2
                );
            }

            if(Core.input.keyTap(speedDownKey)){
                speedMultiplier=Math.max(1,speedMultiplier-1);
                Vars.ui.showInfoToast(
                    locale.get("speed")+" "+speedMultiplier+"x",
                    2
                );
            }

            if(Core.input.keyTap(speedUpKey)){
                speedMultiplier++;
                Vars.ui.showInfoToast(
                    locale.get("speed")+" "+speedMultiplier+"x",
                    2
                );
            }
        }

        //Do not run movement code too frequently
        var now=Time.millis();
        if(now-superSpeedLastUpdate<16)
            return;

        superSpeedLastUpdate=now;

        //Current unit
        var u=Vars.player.unit();

        if(u==null||!u.isValid())
            return;

        //Disable Super Speed while disabled or typing
        if(TabOpen(textField)){
            u.speedMultiplier=1;
            return;
        }

        //Apply speed
        u.speedMultiplier=speedMultiplier;

        //Use the configured movement keys
        var x=Core.input.axis(Binding.moveX);
        var y=Core.input.axis(Binding.moveY);

        if(x!=0||y!=0)
            u.vel.set(x,y).setLength(u.speed());
    }
});
Core.app.addListener(superSpeedUpdate);

print(locale.get("superSpeed")+(fristexec?" installed.":" reinstalled.")+" By:  [cyan]ouf");
