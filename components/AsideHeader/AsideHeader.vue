<template>
  <div class="flex h-auto w-full justify-between">
    <span class="flex items-center justify-start gap-0.5 font-black"><Icon name="material-symbols:radar" size="24" /> Equipment Tracker</span>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon">
          <Icon name="lucide:info" size="20" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Legend />
      </PopoverContent>
    </Popover>
  </div>
</template>
