#!/bin/bash

s3_bucket=minreport2020

echo "------------------------------------------"
echo "Setting up Minority Report redirects on ${s3_bucket}"
echo "------------------------------------------"



old=('sitemap_index.xml'
'post-sitemap.xml'
'category-sitemap.xml'
'author-sitemap.xml')

new=('https://admin.min.report/sitemap_index.xml'
'https://admin.min.report/post-sitemap.xml'
'https://admin.min.report/category-sitemap.xml'
'https://admin.min.report/author-sitemap.xml')

for (( i = 0; i < ${#old[@]}; ++i )); do
    echo "Redirect"
    echo "Old URL: ${old[i]}"
    echo "New URL: ${new[i]}"
    aws s3api put-object --acl public-read --website-redirect-location "${new[i]}" --bucket ${s3_bucket} --key ${old[i]}
    echo ""
done
