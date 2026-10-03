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
    var superSpeedKey=KeyBind.add(locale.get("superSpeed"),KeyCode.z,locale.get("superSpeed"));
    var speedDownKey=KeyBind.add(locale.get("speedDown"),KeyCode.comma,locale.get("superSpeed"));
    var speedUpKey=KeyBind.add(locale.get("speedUp"),KeyCode.period,locale.get("superSpeed"));

    //Check if Super Speed is disabled or a TextField has focus
    function TabOpen(textField){
        return !superSpeed||textField;
    }

    var superSpeedLastUpdate=0;
   
}
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
