org="https://github.com/VyperGroup/"

npm install > /dev/null

if [ ! -d scripts/sdk ]
then
    cd scripts
        git clone "${org}sdk.git"
    cd ..
fi

cd scripts
    cd sdk
        git pull > /dev/null
    cd ..
cd ..