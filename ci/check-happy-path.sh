# format source
echo "checking all greetings"
node ci/js/check-greetings.js

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi


echo "checking all characters have at least one choice at each challenge"
node ci/js/check-all-characters-have-choices-at-challenges.js

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

echo "checking character desired possessions are rewarded by at least one choice in one challenge"
node ci/js/check-all-characters-have-desired-possessions-as-rewards.js

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: (Code 0)."
else
    echo "❌ FAILURE: (Code $?)."
    exit 1
fi

# echo "⚠️ skipped"

echo "✅✅ SUCCESS"
