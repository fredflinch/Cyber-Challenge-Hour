#! /bin/bash
mkdir ./tmp/;
base64 -d $1 > ./tmp/v;
binwalk -e ./tmp/v;
tar -xzvf ./tmp/_v.extracted/*.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
tar -xzvf flag.tar.gz.tar.gz;
rm flag.tar.gz.tar.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
tar -xzvf flag.tar.gz;
rm flag.tar.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
tar -xzvf flag.tar.gz*;
rm flag.tar.gz.tar.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
tar -xzvf flag.tar.gz
rm flag.tar.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
tar -xzvf flag.tar.gz
rm flag.tar.gz;
bzip2 -d *.bz2;
xz --format=lzma -d flag.*lzma;
cat flag; echo;
rm -rf ./tmp/;



