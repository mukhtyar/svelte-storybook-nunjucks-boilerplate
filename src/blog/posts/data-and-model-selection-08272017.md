---
title: Underlying Data and Model Selection in Cal-Adapt 2.0
permalink: underlying-data-model-selection-caladapt-08272017
date: 2019-08-27
author: Cal-Adapt
image: caladapt_post
tags: Data
snippet: The projected temperature and precipitation data portrayed on Cal-Adapt 2.0 were statistically downscaled using LOCA by Scripps Institution of Oceanography. This post discusses the data and model selection in Cal-Adapt 2.0.
---

Through Cal-Adapt, users can download projected climate data associated with 32 General Circulation Models (GCMs, also known as Global Climate Models). This suite of models—known as [CMIP5](http://cmip-pcmdi.llnl.gov/cmip5/data_portal.html)—was used as the basis for the United Nation’s Intergovernmental Panel on Climate Change (IPCC) Fifth Assessment Report.  There is a vast body of literature built on the CMIP5 data, and its use aligns Cal-Adapt with current, peer-reviewed science that is broadly used as a basis for policy-relevant analyses.

### LOCA: Statistical Method for Deriving High-Resolution Results

Because CMIP5 data describe the earth’s climate system in three dimensions, it maintains a relatively coarse resolution for computational tractability. Thus, it cannot directly support local analyses of climate-related risks. To enable adequate temporal and spatial resolution for local climate analyses, global climate model results must be <q>downscaled</q> through methods that use some combination of underlying physics, local geographical features, and/or statistical relationships between historical broader-scale and local climatic observations.

The projected temperature and precipitation data portrayed on Cal-Adapt 2.0 were statistically downscaled using [LOCA](http://loca.ucsd.edu/what-is-loca/) (Localized Climate Analogues), a method developed at Scripps Institution of Oceanography that is part of the University of California at San Diego. LOCA results are highly-resolved in both space (1/16° grid, ca. 3.7 miles × 3.7 miles) and time (daily resolution).

Among LOCA’s strengths are its ability to better capture extreme temperatures and spatial distribution of precipitation. This is very important, because temperature extremes and precipitation are responsible for many of California’s climate vulnerabilities.

### Why Does Cal-Adapt Show Projections Based on 10 Climate Models?

In August of 2015, the California Department of Water Resources (DWR) released [Perspectives and Guidance for Climate Change Analysis](http://www.water.ca.gov/climatechange/docs/2015/1_14_16_PerspectivesAndGuidanceForClimateChangeAnalysis_MasterFile_FINAL_08_14_2015_LRW.pdf). Included in this document is a description of the selection of 10 global climate models based on criteria of importance to management of water resources in California. DWR’s Climate Change Technical Advisory Group (CCTAG), a diverse team of professional scientists and practitioners, identified the 10 models that are available in Cal-Adapt visualizations based on their satisfactory performance with regard to key processes at a variety (global, regional, California) of scales. This contribution is important because it offers a more tractable subset of the vast body of available data, and the subset is strategically selected as <q>the most suitable for California climate and water resource assessment and planning purposes</q>.

### Why Does Cal-Adapt Default to 4 Climate Models?

Many researchers and practitioners with climate change-related concerns do not presently have the resources to consider all ten of the model’s selected by DWR’s CCTAG. With that in mind, a more manageable subset of those ten models was identified by the Climate Action Team Research Working Group with input from researchers contributing to California’s Fourth Climate Change Assessment and in coordination with the Governor’s Office of Planning and Research Adaptation Technical Advisory Group. Based on systematic statistical analyses delineated by Scripps Institution of Oceanography  ([see section 6 of Pierce et al, 2016](http://www.energy.ca.gov/2016_energypolicy/documents/2016-06-21_workshop/2016-06-21_documents.php)) four global climate models were chosen to represent a range of possible futures for California. The statistical analyses consider the models’ LOCA downscaled projections over the state of California for criteria of significance with regard to climate change. These criteria relate to temperature (maximum daily temperatures and variability thereof), precipitation (average, dry spells, and variability).

> The actual four models that Cal-Adapt defaults to are different from those described in Pierce et al 2016, because
Pierce et al apply their analyses to the 2015-2050 time frame, whereas the final decision embraced by California’s
Climate Action Team was to consider a longer-term (2015-2100) analysis, which Pierce et al graciously performed.

The following points are important to note:
* Although the models are nicknamed <q>hot/dry</q>, <q>cool/wet</q>, <q>average</q>, and <q>complement</q>, these monikers are apt only in a statistical sense based on analysis of the entire state of California over the 2015-2100 timeframe. In other words, the so-called <q>hot/dry</q> model should not be assumed to be the <q>hottest/driest</q> for a particular visualization or analysis.
* The so-called <q>cool/wet</q> model still describes a warming climate, but one that (in a statistical sense over the 2015-2100 timeframe) is relatively cooler and wetter than the other DWR CCTAG models.
