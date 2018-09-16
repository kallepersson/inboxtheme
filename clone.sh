#!/bin/bash
while sleep 1; do	
	echo "(function(){"  > in-min.js
	echo "const _css = \`"  >> in-min.js
	cat in.css >> in-min.js
	#echo "body::after { content: '"  >> in-min.js
	#echo $(date +"%H:%M:%S") >> in-min.js
	#echo "';}"  >> in-min.js
	echo "\`;"  >> in-min.js
	cat in.js >> in-min.js
	echo "})();" >> in-min.js
done