const processPages = (pages, configuration) => {
    return pages
        .map(page => _transformPageAndFilterSectionWithinTimeOffsetr(page, configuration))
        .flatMap(_transformToSectionArray)
        .sort(_sortByTime)
}

const _transformPageAndFilterSectionWithinTimeOffsetr = (page, configuration) => {
    return {
        name: page?.name?.en || "Unknown Name",
        pageCode: page?.code || "Unknown Code",
        sections: page?.body
            ?.map(_resolveSectionItem)
            ?.filter(section => _isSectionWithinTimeOffset(section, configuration)) || []
    }
}

const _resolveSectionItem = bodyItem => {
    const createdTime = new Date(bodyItem.sys.cts);
    const modifiedTime = bodyItem.sys.mts && createdTime.getTime() !== new Date(bodyItem.sys.mts).getTime() ? new Date(bodyItem.sys.mts) : null;
    return {
        code: bodyItem.code,
        created: createdTime,
        modified: modifiedTime,
        uuIdentityName: bodyItem.uuIdentityName,
        uuIdentity: bodyItem.uuIdentity
    }
}

const _isSectionWithinTimeOffset = (section, configuration) => {
    return section.modified > configuration.notifications.timeFrom || section.created > configuration.notifications.timeFrom
}

const _transformToSectionArray = page => {
    return page.sections
        .map(section => {
            return {
                name: page.name,
                pageCode: page.pageCode,
                ...section
            }
        });
}

const _sortByTime = (a, b) => {
    return a?.modified?.getTime() < b?.modified?.getTime() ? -1 : a?.modified?.getTime() > b?.modified?.getTime() ? 1 : 0;
}

module.exports = {
    processPages
}