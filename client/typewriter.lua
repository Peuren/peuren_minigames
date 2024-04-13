---Start the Typewriting minigame
---@param count number
---@param completeTime number
---@return unknown
function StartTypewriter(count, completeTime)
    if ActiveMinigamePromise then return end
    ToggleNuiFrame(true)
    SendUIMessage("openPage", {
        page = "typewriter",
        options = {
            count = count,
            completeTime = completeTime
        }
    })
    ActiveMinigamePromise = promise:new()
    return Citizen.Await(ActiveMinigamePromise)
end

RegisterNuiCallback("failedTypewriter", function(data, cb)
    cb(true)
    ActiveMinigamePromise:resolve(false)
    ActiveMinigamePromise = nil
    ToggleNuiFrame(false)
end)

RegisterNuiCallback("successTypewriter", function(data, cb)
    cb(true)
    ActiveMinigamePromise:resolve(true)
    ActiveMinigamePromise = nil
    ToggleNuiFrame(false)
end)


exports("StartTypewriter", StartTypewriter)

RegisterCommand("trytype", function()
    print(StartTypewriter(5, 2000))
end)