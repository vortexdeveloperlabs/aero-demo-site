org="https://github.com/ProxyHaven/"

if [ ! -d aero ]
then
    git clone "${org}/aero.git"
fi

cd aero
    git pull > /dev/null
cd ..

if [ ! -d script/sdk ]
then
    cd script
        git clone "${org}/aero-sdk.git" sdk
    cd ..
fi

cd script
    cd sdk
        git pull > /dev/null
    cd ..
cd ..