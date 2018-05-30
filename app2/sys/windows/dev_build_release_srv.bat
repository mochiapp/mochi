setlocal enableDelayedExpansion

call ../conf/conf.bat

SET "dr=%cd%\..\.."

SET "cmd1=./sys/helper/dev_build_release_srv.sh '%sys_build_dev_path%' '%sys_build_release_repo%' '%sys_build_git_user_name%' '%sys_build_git_user_email%' '%sys_build_ssh_port%' '%sys_build_ssh_srv%' '%sys_build_srv_path%'"

SET con=C:\Program Files\ConEmu\ConEmu64.exe
SET bsh=C:/Program Files/Git/bin/bash.exe
SET c1=%bsh% --login -i -new_console:t:"%sys_build_title_cons1%":s:d:"%dr%" -c "%cmd1%"

start "" "%con%" -Max -Title %sys_build_title% -runlist !c1!
