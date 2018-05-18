CMD1="
$2
"
SCR1="
if ! screen -list | grep -q '$1'; then
  screen -dmS $1 bash -c 'bash --login'
  screen -S $1 -p 0 -X stuff '$CMD1'
  screen -r $1
else
  screen -d -r $1
fi
"

ssh -t -p $3 $4 "$SCR1"