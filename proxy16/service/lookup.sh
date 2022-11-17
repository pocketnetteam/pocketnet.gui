IFS=$'\n'

mainHosts=( $(jq -r '.combat[].main.host' peertube-servers.json) )
mirrorHosts=( $(jq -r '.combat[].mirror.host' peertube-servers.json) )

for i in "${!mainHosts[@]}"; do
  groupId=$(jq -r '.combat['"${i}"'].id' peertube-servers.json)

  savedMainIp=$(jq -r '.combat['"${i}"'].main.ip' peertube-servers.json)
  savedMirrorIp=$(jq -r '.combat['"${i}"'].mirror.ip' peertube-servers.json)

  lookedMainIp=$(dig +short ${mainHosts[i]} | tail -n1)
  lookedMirrorIp=$(dig +short ${mirrorHosts[i]} | tail -n1)

  if [ "$savedMainIp" != "$lookedMainIp" ]; then
    echo "------"
    echo "GROUP ${groupId} main host is invalid"

    echo "SAVED MAIN IP [${groupId}] ${savedMainIp}"
    echo "LOOKED MAIN IP [${groupId}] ${lookedMainIp}"

    echo "$(jq -r '.combat['"${i}"'].main.ip = "'"${lookedMainIp}"'"' peertube-servers.json)" > peertube-servers.json
  fi

  if [ "$savedMirrorIp" != "$lookedMirrorIp" ] && [ "$savedMirrorIp" != "null" ]; then
    echo "------"
    echo "GROUP ${groupId} mirror host is invalid"

    echo "SAVED MIRROR IP [${groupId}] ${savedMirrorIp}"
    echo "LOOKED MIRROR IP [${groupId}] ${lookedMirrorIp}"

    echo "$(jq -r '.combat['"${i}"'].mirror.ip = "'"${lookedMirrorIp}"'"' peertube-servers.json)" > peertube-servers.json
  fi
done

