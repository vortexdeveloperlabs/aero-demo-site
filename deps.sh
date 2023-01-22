if [ ! -d aero ]
then
    git clone https://github.com/ProxyHaven/aero.git
    cd aero
        git pull > /dev/null 2>&1
    cd ..
fi

if [ ! -d script/sdk ]
then
    cd script
        git clone https://github.com/ProxyHaven/sdk.git
        cd sdk
            git pull > /dev/null 2>&1
        cd ..
    cd ..
fi