org="https://github.com/ProxyHaven/"

if [ ! -d aero ]
then
    git clone "${org}/aero.git"
    cd aero
        git pull > /dev/null 2>&1
    cd ..
fi

if [ ! -d script/sdk ]
then
    cd script
        git clone "${org}/aero-sdk.git"
        cd sdk
            git pull > /dev/null 2>&1
        cd ..
    cd ..
fi