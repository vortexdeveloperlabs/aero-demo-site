org="https://github.com/VyperGroup/"

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
        git clone "${org}/sdk.git"
    cd ..
fi

cd script
    cd sdk
        git pull > /dev/null
    cd ..
cd ..