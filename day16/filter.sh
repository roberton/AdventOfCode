#!/bin/sh

cp input.txt in.txt
cat in.txt | grep 'children: 3' > out.txt
cat in.txt | grep -v 'children' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'cats: 7' > out.txt
cat in.txt | grep -v 'cats' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'samoyeds: 2' > out.txt
cat in.txt | grep -v 'samoyeds' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'pomeranians: 3' > out.txt
cat in.txt | grep -v 'pomeranians' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'akitas: 0' > out.txt
cat in.txt | grep -v 'akitas' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'vizslas: 0' > out.txt
cat in.txt | grep -v 'vizslas' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'goldfish: 5' > out.txt
cat in.txt | grep -v 'goldfish' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'trees: 3' > out.txt
cat in.txt | grep -v 'trees' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'cars: 2' > out.txt
cat in.txt | grep -v 'cars' >> out.txt

mv out.txt in.txt
cat in.txt | grep 'perfumes: 1' > out.txt
cat in.txt | grep -v 'perfumes' >> out.txt

rm in.txt

wc -l input.txt
wc -l out.txt
