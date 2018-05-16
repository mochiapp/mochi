SET sys_dev_title=OpenBook_dev
SET sys_dev_title_cons1=OpenBookConsole
SET sys_dev_title_cons2=OpenBookWatcher
SET sys_dev_sync_port=51076
SET sys_dev_box_sys_dir=/vagrant/app/sys

SET sys_dev_screen1_cmd=echo \"$(tput clear)\" ; ^
echo \"===============================\" ; ^
echo \"To re-run parcel dev server do:\" ; ^
echo \"$(tput setaf 3)# yarn dev$(tput sgr0)\" ; ^
echo \"To visit the dev site:\" ; ^
echo \"$(tput setaf 3)http://127.0.0.1:51075$(tput sgr0)\" ; ^
echo \"===============================\" ; ^
echo ; ^
cd /_vagrant/app ; ^
yarn dev
