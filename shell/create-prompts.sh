# run from root dir as ./shell/create-prompts.sh

echo "creating scenes prompts"
node js/create-scenes-prompts.js
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi


echo "creating possessions prompts"
node js/create-possessions-prompts.js
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "creating characters prompts"
node js/create-characters-prompts.js 
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "creating challenges prompts"
node js/create-challenges-prompts.js 
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "creating choices prompts"
node js/create-choices-prompt.js      
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "formatting source"
./ci/do-format-source.sh             
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "success"
