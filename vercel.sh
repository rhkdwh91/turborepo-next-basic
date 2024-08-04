#!/bin/bash

echo "Updating git submodules..."

# submodule 초기화
git submodule init

# submodule 업데이트
git submodule update --recursive --remote

echo "Git submodules updated successfully!"