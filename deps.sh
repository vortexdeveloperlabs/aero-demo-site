org="https://github.com/ProxyHaven/"

if [ ! -d aero ]
then
    git clone "${org}/aero.git" aeroGit
fi

cd aeroGit
    git pull
    npm install
    npm run build
    mv dist ../aero
cd ..

if [ ! -d script/sdk ]
then
    cd script
        git clone "${org}/sdk.git" sdk
    cd ..
fi

cd script
    cd sdk
        git pull
    cd ..
cd ..