reloadFxFromRubyMine = hs.hotkey.new('⌘', 'r', function()
      hs.application.launchOrFocus("Firefox.app")
      reloadFxFromRubyMine:disable() -- does not work without this, even though it should
      hs.eventtap.keyStroke({"⌘"}, "r")
  end)

hs.window.filter.new('RubyMine')
    :subscribe(hs.window.filter.windowFocused,function() reloadFxFromRubyMine:enable() end)
    :subscribe(hs.window.filter.windowUnfocused,function() reloadFxFromRubyMine:disable() end)

    -- https://github.com/Hammerspoon/hammerspoon/issues/664
