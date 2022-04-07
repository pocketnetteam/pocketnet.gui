InstallDir "$LocalAppData\Programs\Pocketnet"

!macro customRemoveFiles
    # RMDir /r "$INSTDIR"

    RMDir /r "$INSTDIR\locales\"
    RMDir /r "$INSTDIR\resources\"
    RMDir /r "$INSTDIR\swiftshader\"
    Delete "$INSTDIR\Bastyon.exe"
    Delete "$INSTDIR\icudtl.dat"
    Delete "$INSTDIR\libGLESv2.dll"
    Delete "$INSTDIR\resources.pak"
    Delete "$INSTDIR\LICENSES.chromium.html"
    Delete "$INSTDIR\d3dcompiler_47.dll"
    Delete "$INSTDIR\vk_swiftshader.dll"
    Delete "$INSTDIR\ffmpeg.dll"
    Delete "$INSTDIR\vulkan-1.dll"
    Delete "$INSTDIR\libEGL.dll"
    Delete "$INSTDIR\Uninstall Bastyon.exe"
    Delete "$INSTDIR\chrome_200_percent.pak"
    Delete "$INSTDIR\v8_context_snapshot.bin"
    Delete "$INSTDIR\chrome_100_percent.pak"
    Delete "$INSTDIR\uninstallerIcon.ico"
    Delete "$INSTDIR\snapshot_blob.bin"
    Delete "$INSTDIR\LICENSE.electron.txt"
    Delete "$INSTDIR\vk_swiftshader_icd.json"

    Delete "$SMSTARTUP\Bastyon.lnk"

!macroend