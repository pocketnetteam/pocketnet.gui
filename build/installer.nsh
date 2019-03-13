!macro customInstall
    CreateShortCut "$SMSTARTUP\${PRODUCT_FILENAME}.lnk" "$INSTDIR\${PRODUCT_FILENAME}.exe"
!macroend

!macro customRemoveFiles
    RMDir /r /REBOOTOK "$INSTDIR"
    Delete "$SMSTARTUP\${PRODUCT_FILENAME}.lnk"
!macroend