#!/bin/bash

xz --format=lzma $1;
bzip2 -z $1.*;
tar -czvf $1.tar.gz $1.*;
rm $1.lzma*;

xz --format=lzma $1.*;
bzip2 -z $1.*;
tar -czvf $1.tar.gz $1.*;
