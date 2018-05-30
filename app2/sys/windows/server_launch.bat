setlocal enableDelayedExpansion

call ../conf/conf.bat

SET "dr=%cd%\..\.."

SET "cmd1=./sys/helper/srv_launch.sh %sys_srv_screen1_title% '%sys_srv_screen1_cmd%' %sys_srv_ssh_port% %sys_srv_ssh_srv%"

SET con=C:\Program Files\ConEmu\ConEmu64.exe
SET bsh=C:/Program Files/Git/bin/bash.exe
SET c1=%bsh% --login -i -new_console:t:"%sys_srv_title_cons1%":s:d:"%dr%" -c "%cmd1%"

start "" "%con%" -Max -Title %sys_srv_title% -runlist !c1!
