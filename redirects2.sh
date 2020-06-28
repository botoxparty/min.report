#!/bin/bash

s3_bucket=minreport2020

echo "------------------------------------------"
echo "Setting up Minority Report redirects on ${s3_bucket}"
echo "------------------------------------------"



old=('thinktank/asstrological-secrets-a-guide-to-sexing-through-the-stars'
    'calling-in/gordon-hookey'
    'minority-report/technophilia-in-the-bedroom'
    'minority-report/optical-illusions'
    'film/final-cut'
    'reports/sublime-pap'
    'minority-report/leslie-cheungs-flying-arrow'
    'reports/community-immunity-the-revolution-was-televised'
    'art/theres-no-art-in-heaven'
    'minority-report/the-great-mutation'
    'minority-report/dying-out-and-loving-it'
    'film/send-in-the-clowns'
    'art/inside-voice-harvester-irene-rose'
    'white-noise/records-of-displacement-lucreccia-quintanilla'
    'minority-report/athens-is-the-new-berlin')

new=('/venus-valentino/asstrological-secrets-a-guide-to-sexing-through-the-stars'
'/audrey-schmidt/gordon-hookey'
'/vincent-le/technophilia-in-the-bedroom'
'/ainslie-templeton/optical-illusions'
'/thinktank/final-cut'
'/thomas-moran/sublime-pap'
'/caitlin-mason/leslie-cheungs-flying-arrow'
'/giles-fielke/community-immunity-the-revolution-was-televised'
'/audrey-schmidt/theres-no-art-in-heaven'
'/vincent-le/the-great-mutation'
'/vincent-le/dying-out-and-loving-it'
'/audrey-schmidt/send-in-the-clowns'
'/reena-nguyen/inside-voice-harvester-irene-rose'
'/fjorn-butler/records-of-displacement-lucreccia-quintanilla'
'/audrey-schmidt/athens-is-the-new-berlin')

for (( i = 0; i < ${#old[@]}; ++i )); do
    echo "Redirect"
    echo "Old URL: ${old[i]}"
    echo "New URL: ${new[i]}"
    aws s3api put-object --acl public-read --website-redirect-location "${new[i]}" --bucket ${s3_bucket} --key ${old[i]}
    echo ""
done


