rm -fr $(pwd)/build/data
rm -fr $(pwd)/build/images
rm -f $(pwd)/build/rricard.pdf
cp -R $(pwd)/data $(pwd)/build/data
cp -R $(pwd)/images $(pwd)/build/images
cp $(pwd)/rricard.pdf $(pwd)/build/rricard.pdf
