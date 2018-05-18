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
sudo yarn dev


SET sys_build_title=OpenBook_build
SET sys_build_title_cons1=OpenBookBuildAndRelease
SET sys_build_dev_path=/_vagrant/app
SET sys_build_release_repo=git@gitlab.com:robertheessels/openbook-dist.git
SET sys_build_git_user_name=Robert Heessels
SET sys_build_git_user_email=robert@heessels.com
SET sys_build_ssh_port=2022
SET sys_build_ssh_srv=root@rh1.breasy.site
SET sys_build_srv_path=/root/RH/observer/server/dist


SET sys_srv_title=OpenBook_srv
SET sys_srv_title_cons1=OpenBookServer
SET sys_srv_screen1_title=obsrvscr
SET sys_srv_ssh_port=2022
SET sys_srv_ssh_srv=root@rh1.breasy.site

SET sys_srv_screen1_cmd=echo \"$(tput clear)\" ; ^
echo \"===============================\" ; ^
echo \"To re-run nodejs server do:\" ; ^
echo \"$(tput setaf 3)# yarn dev$(tput sgr0)\" ; ^
echo \"To visit the site:\" ; ^
echo \"$(tput setaf 3)http://rh1.breasy.site:8090$(tput sgr0)\" ; ^
echo \"===============================\" ; ^
echo ; ^
cd /root/RH/observer/server ; ^
yarn dev
