setlocal enabledelayedexpansion
echo.
echo.
echo.
echo ======================================================================
echo.
echo !TIME!... file(s) changed... triggering file sync.
echo.
echo ======================================================================
echo.
curl 127.0.0.1:%sys_dev_sync_port%
echo.
echo ======================================================================
