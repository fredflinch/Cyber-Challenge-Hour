#!/bin/bash
base64 -d file > inter; binwalk -e inter; tar -xzvf _inter.extracted/*.gz; rm -rf _inter* inter
