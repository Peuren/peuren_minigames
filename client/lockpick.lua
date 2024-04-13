local breakChance = 0

---Start the Lockpick minigame
---@param pickCount number
---@param eventStep number
---@param bChance number
---@return unknown
function StartLockpick(pickCount, eventStep, bChance)
    if ActiveMinigamePromise then return end
    ToggleNuiFrame(true)
    SendUIMessage("openPage", {
        page = "lockpick",
        options = {
            eventStep = eventStep,
            pickCount = pickCount
        }
    })
    breakChance = bChance
    ActiveMinigamePromise = promise:new()
    return Citizen.Await(ActiveMinigamePromise)
end

RegisterNuiCallback("failedPicking", function(data, cb)
    if math.random(1, 100) < breakChance then
        ActiveMinigamePromise:resolve(false)
        ActiveMinigamePromise = nil
        ToggleNuiFrame(false)
    end
    cb(true)
end)

RegisterNuiCallback("finishedPicking", function(data, cb)
    cb(true)
    ActiveMinigamePromise:resolve(true)
    ActiveMinigamePromise = nil
    ToggleNuiFrame(false)
end)

exports("StartLockpick", StartLockpick)

RegisterCommand("trylockpick", function()
    print(StartLockpick(3, 5, 5))
end)