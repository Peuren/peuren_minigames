---Start the Hacking minigame
---@param count number
---@param rememberTime number
---@param completeTime number
---@return unknown
function StartHacking(count, rememberTime, completeTime)
    if ActiveMinigamePromise then return end
    ToggleNuiFrame(true)
    SendUIMessage("openPage", {
        page = "hacking",
        options = {
            count = count, 
            rememberTime = rememberTime, 
            completeTime = completeTime
        }
    })
    ActiveMinigamePromise = promise:new()
    return Citizen.Await(ActiveMinigamePromise)
end

RegisterNuiCallback("failedHacking", function(data, cb)
    cb(true)
    ActiveMinigamePromise:resolve(false)
    ActiveMinigamePromise = nil
    ToggleNuiFrame(false)
end)

RegisterNuiCallback("successHacking", function(data, cb)
    cb(true)
    ActiveMinigamePromise:resolve(true)
    ActiveMinigamePromise = nil
    ToggleNuiFrame(false)
end)


exports("StartHacking", StartHacking)